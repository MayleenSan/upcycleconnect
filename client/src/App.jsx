import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
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

function PrivateRoute({ connecte, children }) {
  return connecte ? children : <Navigate to="/login" />
}

export default function App() {
  const [connecte, setConnecte] = useState(false)
  const [tutorielVu, setTutorielVu] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setConnecte={setConnecte} />} />
        <Route path="/register" element={<Register setConnecte={setConnecte} />} />
        <Route path="/" element={
          <PrivateRoute connecte={connecte}>
            <Layout>
              <Home tutorielVu={tutorielVu} setTutorielVu={setTutorielVu} />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/annonces" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Annonces /></Layout>
          </PrivateRoute>
        } />
        <Route path="/annonces/nouvelle" element={
          <PrivateRoute connecte={connecte}>
            <Layout><NouvelleAnnonce /></Layout>
          </PrivateRoute>
        } />
        <Route path="/conteneur" element={
          <PrivateRoute connecte={connecte}>
            <Layout><DemandeConteneur /></Layout>
          </PrivateRoute>
        } />
        <Route path="/catalogue" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Catalogue /></Layout>
          </PrivateRoute>
        } />
        <Route path="/score" element={
          <PrivateRoute connecte={connecte}>
            <Layout><UpcyclingScore /></Layout>
          </PrivateRoute>
        } />
        <Route path="/conseils" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Conseils /></Layout>
          </PrivateRoute>
        } />
        <Route path="/planning" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Planning /></Layout>
          </PrivateRoute>
        } />
        <Route path="/profil" element={
          <PrivateRoute connecte={connecte}>
            <Layout><Profil /></Layout>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}