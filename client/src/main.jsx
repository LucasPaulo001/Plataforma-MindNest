import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//Provider (aqui ele "amarrará" toda a aplicação e injetará os dados")
import { AuthProvider } from './contexts/authContext.jsx'
import { PagesProvider } from './contexts/pagesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <PagesProvider>
        <App />
      </PagesProvider> 
    </AuthProvider>
  </StrictMode>,
)
