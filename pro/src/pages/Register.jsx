import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, User, Building } from 'lucide-react'

const accountTypes = ['Artisan', 'Entreprise']
const emptyForm = { entreprise: '', nom: '', email: '', password: '', confirm: '', type: 'Artisan' }

export default function Register({ setConnecte }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleRegister = () => {
    if (!form.entreprise || !form.nom || !form.email || !form.password || !form.confirm) {
      setError('Remplis tous les champs.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
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
          <p className="text-gray-500 text-sm mt-1">Créer un compte professionnel</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-6">Inscription Pro</h2>

          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">
              Nom de l'entreprise / atelier
            </label>
            <div className="relative">
              <Building size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="entreprise"
                type="text"
                placeholder="Forge & Patine"
                value={form.entreprise}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Type de compte</label>
            <div className="flex gap-2">
              {accountTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    form.type === t
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom du responsable</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="nom"
                type="text"
                placeholder="Jean Dupont"
                value={form.nom}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="contact@atelier.fr"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            {[['password', 'Mot de passe'], ['confirm', 'Confirmer']].map(([name, label]) => (
              <div key={name} className="flex-1">
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{label}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name={name}
                    type="password"
                    placeholder="••••••••"
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            Créer mon compte professionnel
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