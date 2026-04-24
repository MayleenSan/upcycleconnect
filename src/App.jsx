import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Utilisateurs from './pages/Utilisateurs'
import Prestations from './pages/Prestations'
import Categories from './pages/Categories'
import Evenements from './pages/Evenements'
import Login from './pages/Login'

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

function PrivateRoute({ connecte, children }) {
  return connecte ? children : <Navigate to="/login" />
}

export default function App() {
  const [connecte, setConnecte] = useState(true) // mettre true quand api est prête

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setConnecte={setConnecte} />} />
        <Route path="/" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/utilisateurs" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Utilisateurs /></Layout>
          </PrivateRoute>
        } />
        <Route path="/prestations" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Prestations /></Layout>
          </PrivateRoute>
        } />
        <Route path="/categories" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Categories /></Layout>
          </PrivateRoute>
        } />
        <Route path="/evenements" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Evenements /></Layout>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}