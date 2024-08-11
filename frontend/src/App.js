// App.js
import React, {useState } from 'react';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import Dashboard from './components/Dashboard';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [performanceData, setPerformanceData] = useState(null);
  const [currentView, setView] = useState('')
  const [error, setError] = useState('')

  const analyzeWebsite = async (url) => {
    setView('LOADING')
    setError('')

    const apiEndpoint = "http://localhost:3001/analyze"
    // const apiEndpoint = "https://speedx-website-performance-analyzer.onrender.com/analyze"

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok){
        
        setPerformanceData(data);
        setView('DASHBOARD')
      } else {
        throw new Error(data.error || "error")
      }
     
    } catch (error) {
      console.error('Error:', error);
      console.log(error.message, "its ");
      
      setError(error.message)
      setView('')
    }
  };

  const renderDashboard = () => {
    switch(currentView) {
      case 'LOADING':
        return <Loader/>
      case 'DASHBOARD':
        return <Dashboard data={performanceData} />
      default:
        return null
    }
  }

  return (
    <div className="App">
      <Header />
      <UrlInput onAnalyze={analyzeWebsite} />
      {error && <p className='error'>{error}</p> }
      {renderDashboard()}
    </div>
  );
}

export default App
