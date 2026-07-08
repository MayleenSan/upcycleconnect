import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Dashboard from './pages/dashboard'
import Utilisateurs from './pages/utilisateurs'
import Prestations from './pages/prestations'
import Categories from './pages/categories'
import Evenements from './pages/evenements'
import Annonces from './pages/annonces'
import Login from './pages/login'
import Register from './pages/register'
import Accueil from './pages/accueil'
import Espace from './pages/espace'


const titres = {
  '/': 'Dashboard',
  '/utilisateurs': 'Utilisateurs',
  '/prestations': 'Prestations',
  '/categories': 'Catégories',
  '/evenements': 'Événements',
  '/annonces': 'Annonces',
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

function getRole() {
  const token = sessionStorage.getItem('token')
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1])).role
  } catch {
    return null
  }
}

function RouteProtegee({ children }) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}

function RouteAdmin({ children }) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }
  if (getRole() !== 'admin') {
    return <Navigate to="/espace" />
  }
  return children
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteAdmin><Layout><Dashboard /></Layout></RouteAdmin>} />
        <Route path="/utilisateurs" element={<RouteAdmin><Layout><Utilisateurs /></Layout></RouteAdmin>} />
        <Route path="/prestations" element={<RouteAdmin><Layout><Prestations /></Layout></RouteAdmin>} />
        <Route path="/categories" element={<RouteAdmin><Layout><Categories /></Layout></RouteAdmin>} />
        <Route path="/evenements" element={<RouteAdmin><Layout><Evenements /></Layout></RouteAdmin>} />
        <Route path="/annonces" element={<RouteAdmin><Layout><Annonces /></Layout></RouteAdmin>} />
        <Route path="/espace" element={<RouteProtegee><Espace /></RouteProtegee>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accueil" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  )
}