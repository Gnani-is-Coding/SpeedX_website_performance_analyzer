import express from "express"
import fetch from 'node-fetch';
// const { JSDOM } = require('jsdom');
// const lighthouse = require('lighthouse');
// const chromeLauncher = require('chrome-launcher');
// const cors = require("cors")
import jsdom from "jsdom"
import lighthouse from "lighthouse"
import * as chromeLauncher from "chrome-launcher"
import  cors from "cors"

const app = express();
const {JSDOM} = jsdom
const port = 3001;

app.use(express.json());
app.use(cors())

app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  try {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);
    const reportJson = JSON.parse(runnerResult.report);

    console.log(reportJson, "report")

    await chrome.kill();

    const performanceScore = reportJson.categories.performance.score * 100;
    const firstContentfulPaint = reportJson.audits['first-contentful-paint'].displayValue;
    const speedIndex = reportJson.audits['speed-index'].displayValue;
    const largestContentfulPaint = reportJson.audits['largest-contentful-paint'].displayValue;
    const totalBlockingTime = reportJson.audits['total-blocking-time'].displayValue;
    const cumulativeLayoutShift = reportJson.audits['cumulative-layout-shift'].displayValue;

    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const totalRequests = document.querySelectorAll('*').length;
    const pageSize = Buffer.byteLength(html, 'utf8') / 1024; // in KB

    res.json({
      performanceScore,
      firstContentfulPaint,
      speedIndex,
      largestContentfulPaint,
      totalBlockingTime,
      cumulativeLayoutShift,
      totalRequests,
      pageSize: pageSize.toFixed(2)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while analyzing the website' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});