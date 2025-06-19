import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { DataContextProvider } from './context/DataContext';
import { TokenContextProvider } from './context/TokenContext';
import { LanguageContextProvider } from './context/LanguageContext';
//import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <DataContextProvider>
        <TokenContextProvider>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
        </TokenContextProvider>
      </DataContextProvider>
    </Router>
  </StrictMode>,
)
