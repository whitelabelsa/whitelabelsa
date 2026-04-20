import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Simple Analytics Injection
const injectAnalytics = () => {
  try {
    const gaId = localStorage.getItem('ga_tracking_id');
    const enabled = localStorage.getItem('analytics_enabled') === 'true';

    if (enabled && gaId && !window.gaInjected) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);

      window.gaInjected = true;
      console.log('Analytics Injected');
    }
  } catch (e) {
    console.error('Analytics Injection Failed', e);
  }
};

injectAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
