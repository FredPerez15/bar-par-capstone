import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-y6ctxclgeyhk6cah.us.auth0.com"
      clientId="XEU1S5QWtjRhUXjQEAm2D4w8OTROO5DI"
      redirectUri={window.location.origin}
      >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>,
  </React.StrictMode>
);
