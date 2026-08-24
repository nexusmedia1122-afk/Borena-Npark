import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import 'leaflet/dist/leaflet.css'
import { DataSaverProvider } from './contexts/DataSaverContext'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DataSaverProvider>
        <App />
      </DataSaverProvider>
    </AuthProvider>
  </React.StrictMode>
)
