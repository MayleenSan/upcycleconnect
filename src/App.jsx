import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Dashboard from './pages/dashboard'
import Utilisateurs from './pages/utilisateurs'
import Prestations from './pages/prestations'
import Categories from './pages/categories'
import Evenements from './pages/evenements'
import Login from './pages/login'


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

function RouteProtegee({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteProtegee><Layout><Dashboard /></Layout></RouteProtegee>} />
        <Route path="/utilisateurs" element={<RouteProtegee><Layout><Utilisateurs /></Layout></RouteProtegee>} />
        <Route path="/prestations" element={<RouteProtegee><Layout><Prestations /></Layout></RouteProtegee>} />
        <Route path="/categories" element={<RouteProtegee><Layout><Categories /></Layout></RouteProtegee>} />
        <Route path="/evenements" element={<RouteProtegee><Layout><Evenements /></Layout></RouteProtegee>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}