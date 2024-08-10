import React, { useState } from 'react';
import './index.css'

function UrlInput({ onAnalyze }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(url);
  };

  return (
    <form className="UrlInput" onSubmit={handleSubmit}>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
        required
      />
      <button type="submit">Analyze</button>
    </form>
  );
}

export default UrlInput;