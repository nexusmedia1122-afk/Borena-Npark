import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
import AdminLogin from './Login'
import WildlifeList from './pages/WildlifeList'
import WildlifeForm from './pages/WildlifeForm'
import StoryList from './pages/StoryList'
import StoryForm from './pages/StoryForm'
import ExperienceList from './pages/ExperienceList'
import ExperienceForm from './pages/ExperienceForm'
import CultureList from './pages/CultureList'
import CultureForm from './pages/CultureForm'
import ConservationList from './pages/ConservationList'
import ConservationForm from './pages/ConservationForm'
import ResearchList from './pages/ResearchList'
import ResearchForm from './pages/ResearchForm'
import MediaList from './pages/MediaList'
import GalleryList from './pages/GalleryList'
import GalleryForm from './pages/GalleryForm'
import MapLocationList from './pages/MapLocationList'
import MapLocationForm from './pages/MapLocationForm'
import AccommodationList from './pages/AccommodationList'
import AccommodationForm from './pages/AccommodationForm'
import VisitorInfoList from './pages/VisitorInfoList'
import VisitorInfoForm from './pages/VisitorInfoForm'
import ContactMessages from './pages/ContactMessages'
import NewsletterList from './pages/NewsletterList'
import HomepageEditor from './pages/HomepageEditor'
import NavigationEditor from './pages/NavigationEditor'
import SiteSettings from './pages/SiteSettings'
import UserManagement from './pages/UserManagement'
import ActivityLog from './pages/ActivityLog'

export default function AdminApp() {
  const [page, setPage] = useState('dashboard')
  const [editId, setEditId] = useState(null)
  const { user, profile, loading } = useAuth()

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /></div>

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100">
        <AdminLogin />
      </div>
    )
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />
      case 'wildlife': return editId ? <WildlifeForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <WildlifeList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'stories': return editId ? <StoryForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <StoryList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'experiences': return editId ? <ExperienceForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <ExperienceList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'culture': return editId ? <CultureForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <CultureList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'conservation': return editId ? <ConservationForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <ConservationList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'research': return editId ? <ResearchForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <ResearchList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'media': return <MediaList />
      case 'gallery': return editId ? <GalleryForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <GalleryList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'map-locations': return editId ? <MapLocationForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <MapLocationList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'accommodation': return editId ? <AccommodationForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <AccommodationList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'visitor-info': return editId ? <VisitorInfoForm id={editId} onBack={() => setEditId(null)} onNavigate={setPage} /> : <VisitorInfoList onCreate={() => setEditId('new')} onEdit={(id) => setEditId(id)} />
      case 'messages': return <ContactMessages />
      case 'newsletter': return <NewsletterList />
      case 'homepage': return <HomepageEditor />
      case 'navigation': return <NavigationEditor />
      case 'settings': return <SiteSettings />
      case 'users': return <UserManagement />
      case 'activity': return <ActivityLog />
      default: return <Dashboard onNavigate={setPage} />
    }
  }

  return (
    <AdminLayout currentPage={page} onNavigate={setPage}>
      {renderPage()}
    </AdminLayout>
  )
}
