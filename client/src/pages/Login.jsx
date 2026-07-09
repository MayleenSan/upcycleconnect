import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../hooks/useTranslation'
import LanguageSelector from '../components/LanguageSelector'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8085'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useTranslation()

  const redirigerSelonRole = (role) => {
    if (role === 'pro') navigate('/pro')
    else if (role === 'salarie') navigate('/salarie')
    else if (role === 'admin') navigate('/admin')
    else navigate('/')
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setErreur(t('login.erreur_champs'))
      return
    }
    setLoading(true)
    setErreur('')
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: email, password }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      const loggedUser = data.user || data
      login(loggedUser)
      redirigerSelonRole(loggedUser.role)
    } catch {
      setErreur(t('login.erreur_credentials'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="flex justify-end mb-4 px-1">
          <LanguageSelector />
        </div>

        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="UpcycleConnect" className="w-16 h-16 object-contain mb-4" />
          <h1 className="text-2xl font-bold text-[#2D6A4F]">UpcycleConnect</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue sur la plateforme</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-6">{t('login.titre')}</h2>

          {erreur && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
              {erreur}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('login.email')}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="exemple@mail.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErreur('') }}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{t('login.mdp')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErreur('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors disabled:opacity-60"
          >
            {loading ? '...' : t('login.bouton')}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            {t('login.inscription')}{' '}
            <Link to="/register" className="text-[#2D6A4F] font-medium hover:underline">
              {t('login.lien_inscription')}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Comptes professionnels et salariés : connectez-vous ici, vous serez redirigé automatiquement vers votre espace.
        </p>

      </div>
    </div>
  )
}