import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/jetbrains-mono'; // Import at the top with other imports

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);