import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../hooks/useTranslation'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8085'

export default function Register() {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', password: '', confirm: '' })
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useTranslation()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErreur('')
  }

  const handleRegister = async () => {
    if (!form.nom || !form.prenom || !form.email || !form.password || !form.confirm) {
      setErreur(t('register.erreur_champs'))
      return
    }
    if (form.password !== form.confirm) {
      setErreur(t('register.erreur_mdp'))
      return
    }
    setLoading(true)
    setErreur('')
    try {
      const res = await fetch(`${API}/api/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.prenom,
          last_name: form.nom,
          mail: form.email,
          password: form.password,
          phone: '',
          address: '',
          role: 'particulier',
          language: 'fr',
        }),
      })
      if (!res.ok) throw new Error()
      // connexion auto après inscription
      const loginRes = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: form.email, password: form.password }),
      })
      if (loginRes.ok) {
        const data = await loginRes.json()
        login(data.user || data)
      }
      navigate('/')
    } catch {
      setErreur(t('register.erreur_api'))
    } finally {
      setLoading(false)
    }
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
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-6">{t('register.titre')}</h2>

          {erreur && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
              {erreur}
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('register.nom')}</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="nom" type="text" placeholder="Dupont" value={form.nom} onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('register.prenom')}</label>
              <input name="prenom" type="text" placeholder="Jean" value={form.prenom} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('register.email')}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="email" type="email" placeholder="exemple@mail.com" value={form.email} onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('register.mdp')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('register.confirmer')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={handleChange}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <button onClick={handleRegister} disabled={loading}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors disabled:opacity-60">
            {loading ? '...' : t('register.bouton')}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            {t('register.deja_compte')}{' '}
            <Link to="/login" className="text-[#2D6A4F] font-medium hover:underline">
              {t('register.lien_connexion')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}