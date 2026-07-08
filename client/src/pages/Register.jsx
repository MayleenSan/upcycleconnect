import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'

export default function Register({ setConnecte }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', password: '', confirm: '' })
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErreur('')
  }

  const handleRegister = () => {
    if (!form.nom || !form.prenom || !form.email || !form.password || !form.confirm) {
      setErreur('Remplis tous les champs.')
      return
    }
    if (form.password !== form.confirm) {
      setErreur('Les mots de passe ne correspondent pas.')
      return
    }
    setConnecte(true)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center py-10">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="UpcycleConnect" className="w-16 h-16 object-contain mb-4" />
          <h1 className="text-2xl font-bold text-[#2D6A4F]">UpcycleConnect</h1>
          <p className="text-gray-500 text-sm mt-1">Créer un compte</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-6">Inscription</h2>

          {erreur && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
              {erreur}
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="nom"
                  type="text"
                  placeholder="Dupont"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Prénom</label>
              <input
                name="prenom"
                type="text"
                placeholder="Jean"
                value={form.prenom}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="exemple@mail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Mot de passe</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Confirmer le mot de passe</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            Créer mon compte
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#2D6A4F] font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}