import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Annonces from './pages/Annonces'
import NouvelleAnnonce from './pages/NouvelleAnnonce'
import DemandeConteneur from './pages/DemandeConteneur'
import Catalogue from './pages/Catalogue'
import UpcyclingScore from './pages/UpcyclingScore'
import Conseils from './pages/Conseils'
import Planning from './pages/Planning'
import Profil from './pages/Profil'
import Layout from './components/Layout'

import DashboardPro from './pages/pro/DashboardPro'
import AnnoncesPro from './pages/pro/AnnoncesPro'
import ConteneursProPage from './pages/pro/ConteneursProPage'
import AbonnementPro from './pages/pro/AbonnementPro'
import NotificationsPro from './pages/pro/NotificationsPro'
import LayoutPro from './pages/pro/LayoutPro'

import DashboardSalarie from './pages/salarie/DashboardSalarie'
import FormationsSalarie from './pages/salarie/FormationSalarie'
import PlanningSalarie from './pages/salarie/PlanningSalarie'
import ConseilsSalarie from './pages/salarie/ConseilsSalarie'
import ForumsSalarie from './pages/salarie/ForumsSalarie'
import LayoutSalarie from './pages/salarie/LayoutSalarie'

import LayoutAdmin from './pages/admin/LayoutAdmin'
import DashboardAdmin from './pages/admin/DashboardAdmin'

// vérifie que l'utilisateur est connecté ET qu'il a le bon rôle pour accéder à l'espace demandé
// si "roles" n'est pas précisé, on vérifie juste qu'il est connecté
function RoleRoute({ children, roles }) {
  const { connecte, user } = useAuth()

  if (!connecte) return <Navigate to="/login" />

  if (roles && !roles.includes(user?.role)) {
    if (user?.role === 'pro') return <Navigate to="/pro" />
    if (user?.role === 'salarie') return <Navigate to="/salarie" />
    if (user?.role === 'admin') return <Navigate to="/admin" />
    return <Navigate to="/" />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* espace particuliers */}
      <Route path="/" element={<RoleRoute roles={['particulier']}><Layout><Home /></Layout></RoleRoute>} />
      <Route path="/annonces" element={<RoleRoute roles={['particulier']}><Layout><Annonces /></Layout></RoleRoute>} />
      <Route path="/annonces/nouvelle" element={<RoleRoute roles={['particulier']}><Layout><NouvelleAnnonce /></Layout></RoleRoute>} />
      <Route path="/conteneur" element={<RoleRoute roles={['particulier']}><Layout><DemandeConteneur /></Layout></RoleRoute>} />
      <Route path="/catalogue" element={<RoleRoute roles={['particulier']}><Layout><Catalogue /></Layout></RoleRoute>} />
      <Route path="/score" element={<RoleRoute roles={['particulier']}><Layout><UpcyclingScore /></Layout></RoleRoute>} />
      <Route path="/conseils" element={<RoleRoute roles={['particulier']}><Layout><Conseils /></Layout></RoleRoute>} />
      <Route path="/planning" element={<RoleRoute roles={['particulier']}><Layout><Planning /></Layout></RoleRoute>} />
      <Route path="/profil" element={<RoleRoute roles={['particulier']}><Layout><Profil /></Layout></RoleRoute>} />

      {/* espace professionnel */}
      <Route path="/pro" element={<RoleRoute roles={['pro']}><LayoutPro><DashboardPro /></LayoutPro></RoleRoute>} />
      <Route path="/pro/annonces" element={<RoleRoute roles={['pro']}><LayoutPro><AnnoncesPro /></LayoutPro></RoleRoute>} />
      <Route path="/pro/conteneurs" element={<RoleRoute roles={['pro']}><LayoutPro><ConteneursProPage /></LayoutPro></RoleRoute>} />
      <Route path="/pro/abonnement" element={<RoleRoute roles={['pro']}><LayoutPro><AbonnementPro /></LayoutPro></RoleRoute>} />
      <Route path="/pro/notifications" element={<RoleRoute roles={['pro']}><LayoutPro><NotificationsPro /></LayoutPro></RoleRoute>} />

      {/* espace salarié */}
      <Route path="/salarie" element={<RoleRoute roles={['salarie']}><LayoutSalarie><DashboardSalarie /></LayoutSalarie></RoleRoute>} />
      <Route path="/salarie/formations" element={<RoleRoute roles={['salarie']}><LayoutSalarie><FormationsSalarie /></LayoutSalarie></RoleRoute>} />
      <Route path="/salarie/planning" element={<RoleRoute roles={['salarie']}><LayoutSalarie><PlanningSalarie /></LayoutSalarie></RoleRoute>} />
      <Route path="/salarie/conseils" element={<RoleRoute roles={['salarie']}><LayoutSalarie><ConseilsSalarie /></LayoutSalarie></RoleRoute>} />
      <Route path="/salarie/forums" element={<RoleRoute roles={['salarie']}><LayoutSalarie><ForumsSalarie /></LayoutSalarie></RoleRoute>} />

      {/* espace admin */}
      <Route path="/admin" element={<RoleRoute roles={['admin']}><LayoutAdmin><DashboardAdmin /></LayoutAdmin></RoleRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}