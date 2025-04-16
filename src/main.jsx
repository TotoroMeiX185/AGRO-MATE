import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Global styles if any
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/Ag-Project'>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
 
);
