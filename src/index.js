import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const options = {
  init: {
    distributed_tracing: { enabled: true },
    privacy: { cookies_enabled: true }
  },
  loader_config: {
    accountID: "7068996",
    trustKey: "7068996",
    agentID: "601580524",
    licenseKey: "NRJS-9ded5a7ccba034a9245",
    applicationID: "601580524"
  },
  info: {
    beacon: "bam.nr-data.net",
    errorBeacon: "bam.nr-data.net",
    licenseKey: "NRJS-9ded5a7ccba034a9245",
    applicationID: "601580524",
    sa: 1
  }
};

// Initialize New Relic Browser Agent (should be before React renders)
new BrowserAgent(options);

// Now bootstrap your React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
