import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import MapPage from './pages/Map'
import Contact from './pages/Contact'
import Offline from './pages/Offline'
import OfflineIndicator from './components/OfflineIndicator'
import BackOnlineIndicator from './components/BackOnlineIndicator'
import SaveForOffline from './components/SaveForOffline'
import DataSaverToggle from './components/DataSaverToggle'
import InstallPrompt from './components/InstallPrompt'
import AdminApp from './admin/AdminApp'

export default function App() {
  const [route, setRoute] = React.useState(window.location.hash.slice(1) || 'home')

  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route.startsWith('admin')) {
    return <AdminApp />
  }

  let Page = Home
  if (route === 'about') Page = About
  else if (route === 'gallery') Page = Gallery
  else if (route === 'map') Page = MapPage
  else if (route === 'contact') Page = Contact
  else if (route === 'offline') Page = Offline

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <OfflineIndicator />
      <BackOnlineIndicator />
      <InstallPrompt />
      <header className="p-4 bg-green-700 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Borena National Park</h1>
          <nav className="space-x-4 flex items-center">
            <a className="hover:underline" href="#home">Home</a>
            <a className="hover:underline" href="#about">About</a>
            <a className="hover:underline" href="#gallery">Gallery</a>
            <a className="hover:underline" href="#map">Map</a>
            <a className="hover:underline" href="#contact">Contact</a>
            <a className="hover:underline" href="#admin">Admin</a>
            <DataSaverToggle />
            <SaveForOffline />
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <Page />
      </main>
    </div>
  )
}
