import express from "express"
import fetch from 'node-fetch'
import jsdom from "jsdom"
import lighthouse from "lighthouse"
import  cors from "cors"
import { config} from "dotenv"
import puppeteer from "puppeteer"
import * as chromeLauncher from "chrome-launcher" 

config()

const app = express();
const { JSDOM } = jsdom
const port = 3001;

app.use(express.json());
app.use(cors())

app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  try {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless'], 
      chromePath: process.env.CHROME_PATH
    });
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

  

    // const browser = await puppeteer.launch({args: ['--no-sandbox']});
    // const options = {
    //   logLevel: 'info',
    //   output: 'json',
    //   onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    //   port: (new URL(browser.wsEndpoint())).port,
    // };

    const runnerResult = await lighthouse(url, options);
    const reportJson = JSON.parse(runnerResult.report);
    console.log(reportJson.audits, "report")

    // await browser.close();
    await chrome.kill();

    const performanceScore = reportJson.categories.performance.score * 100;
    const accessibilityScore = reportJson.categories.accessibility.score * 100;
    const bestPracticesScore = reportJson.categories['best-practices'].score * 100;
    const seoScore = reportJson.categories.seo.score * 100;

    const firstContentfulPaint = reportJson.audits['first-contentful-paint'].displayValue;
    const speedIndex = reportJson.audits['speed-index'].displayValue;
    const largestContentfulPaint = reportJson.audits['largest-contentful-paint'].displayValue;
    const totalBlockingTime = reportJson.audits['total-blocking-time'].displayValue;
    const cumulativeLayoutShift = reportJson.audits['cumulative-layout-shift'].displayValue;
    const timeToInteractive = reportJson.audits['interactive'].displayValue;
    const firstMeaningfulPaint = reportJson.audits['first-meaningful-paint'].displayValue;

    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const totalRequests = document.querySelectorAll('*').length;
    const pageSize = Buffer.byteLength(html, 'utf8') / 1024; // in KB
    const imageCount = document.querySelectorAll('img').length;
    const scriptCount = document.querySelectorAll('script').length;

    res.json({
      performanceScore,
      accessibilityScore,
      bestPracticesScore,
      seoScore,
      firstContentfulPaint,
      speedIndex,
      largestContentfulPaint,
      totalBlockingTime,
      cumulativeLayoutShift,
      timeToInteractive,
      firstMeaningfulPaint,
      totalRequests,
      pageSize: pageSize.toFixed(2),
      imageCount,
      scriptCount
    });
  } catch (error) {
    console.error(error.message, "errrororrrrrrrrrrrrrr");
    res.status(500).json({ error: error.message  });
  }
});

app.get("/", async(req,res) => {
  console.log("Available endpoints are &/analyze")

    res.send({ mag: "avalable endpoints are '/analyze', 'POST' request" })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});