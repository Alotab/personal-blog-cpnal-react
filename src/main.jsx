import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fanta.css'
import App from './App.jsx'
import { ApiProviders } from './context/ApiProvider.jsx'
// import { AuthProvider } from './context/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProviders>
      <App />
    </ApiProviders>
  </StrictMode>

)