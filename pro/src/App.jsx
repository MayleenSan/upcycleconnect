import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Annonces from './pages/Annonces'
import Projets from './pages/Projets'
import Notifications from './pages/Notifications'
import Abonnement from './pages/Abonnement'
import Profil from './pages/Profil'

export default function App() {
  const [connecte, setConnecte] = useState(false)

  const ProtectedLayout = ({ children }) => {
    if (!connecte) return <Navigate to="/login" replace />
    return <Layout>{children}</Layout>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setConnecte={setConnecte} />} />
        <Route path="/register" element={<Register setConnecte={setConnecte} />} />
        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/annonces" element={<ProtectedLayout><Annonces /></ProtectedLayout>} />
        <Route path="/projets" element={<ProtectedLayout><Projets /></ProtectedLayout>} />
        <Route path="/notifications" element={<ProtectedLayout><Notifications /></ProtectedLayout>} />
        <Route path="/abonnement" element={<ProtectedLayout><Abonnement /></ProtectedLayout>} />
        <Route path="/profil" element={<ProtectedLayout><Profil /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
