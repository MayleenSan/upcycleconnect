import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Formations from './pages/Formations'
import Planning from './pages/Planning'
import Conseils from './pages/Conseils'
import Forums from './pages/Forums'
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
        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/formations" element={<ProtectedLayout><Formations /></ProtectedLayout>} />
        <Route path="/planning" element={<ProtectedLayout><Planning /></ProtectedLayout>} />
        <Route path="/conseils" element={<ProtectedLayout><Conseils /></ProtectedLayout>} />
        <Route path="/forums" element={<ProtectedLayout><Forums /></ProtectedLayout>} />
        <Route path="/profil" element={<ProtectedLayout><Profil /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
