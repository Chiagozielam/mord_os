import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/auth/auth.provider'
import AccountProvider from './context/account/account.provider'
import MemoryProvider from './context/memory/memory.provider'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AccountProvider>
        <MemoryProvider>
          <Router>
            <App />
          </Router>
        </MemoryProvider>
      </AccountProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
