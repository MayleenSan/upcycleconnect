import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'

export default function Login({ setConnecte }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email && password) {
      setConnecte(true)
      navigate('/')
    } else {
      setErreur('Remplis tous les champs.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">
      <div className="w-full max-w-md">

        {/* logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="UpcycleConnect" className="w-16 h-16 object-contain mb-4" />
          <h1 className="text-2xl font-bold text-[#2D6A4F]">UpcycleConnect</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue sur la plateforme</p>
        </div>

        {/* card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-6">Connexion</h2>

          {erreur && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
              {erreur}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Email</label>
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
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Mot de passe</label>
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
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            Se connecter
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-[#2D6A4F] font-medium hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}