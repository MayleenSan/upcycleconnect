import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Dashboard from './pages/dashboard'
import Utilisateurs from './pages/utilisateurs'
import Prestations from './pages/prestations'
import Categories from './pages/categories'
import Evenements from './pages/evenements'


const titres = {
  '/': 'Dashboard',
  '/utilisateurs': 'Utilisateurs',
  '/prestations': 'Prestations',
  '/categories': 'Catégories',
  '/evenements': 'Événements',
}

function Layout({ children }) {
  const chemin = window.location.pathname
  const titre = titres[chemin] || 'Admin'

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      <Sidebar />
      <div className="ml-64">
        <Header titre={titre} />
        <main className="pt-24 px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/utilisateurs" element={<Layout><Utilisateurs /></Layout>} />
        <Route path="/prestations" element={<Layout><Prestations /></Layout>} />
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/evenements" element={<Layout><Evenements /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}