import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, User, Phone } from 'lucide-react'
import { register } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', mail: '', password: '', phone: '',
  })
  const [erreur, setErreur] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [succes, setSucces] = useState(false)
  const navigate = useNavigate()

  const maj = (champ, valeur) => { setForm({ ...form, [champ]: valeur }); setErreur('') }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.first_name || !form.last_name || !form.mail || !form.password) {
      setErreur('Merci de remplir tous les champs obligatoires.')
      return
    }
    setSubmitting(true)
    try {
      await register({ ...form, role: 'particulier', language: 'fr' })
      setSucces(true)
    } catch (err) {
      setErreur(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (succes) {
    return (
      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <img src="/logo.png" alt="UpcycleConnect" className="w-16 h-16 object-contain mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-[#2D6A4F] mb-2">Compte créé !</h2>
          <p className="text-gray-600 text-sm mb-5">
            Un email de vérification a été envoyé à <b>{form.mail}</b>.
            Clique sur le lien reçu pour activer ton compte, puis connecte-toi.
          </p>
          <Link to="/login" className="text-[#2D6A4F] font-medium hover:underline">Aller à la connexion</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center py-10">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="UpcycleConnect" className="w-16 h-16 object-contain mb-4" />
          <h1 className="text-2xl font-bold text-[#2D6A4F]">UpcycleConnect</h1>
          <p className="text-gray-500 text-sm mt-1">Créer un compte</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-6">Inscription</h2>

          {erreur && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
              {erreur}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Prénom *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={form.first_name}
                  onChange={e => maj('first_name', e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom *</label>
              <input type="text" value={form.last_name}
                onChange={e => maj('last_name', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Email *</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={form.mail}
                onChange={e => maj('mail', e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Mot de passe *</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" value={form.password}
                onChange={e => maj('password', e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Téléphone</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={form.phone}
                onChange={e => maj('phone', e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
            </div>
          </div>

          <button type="submit" disabled={submitting}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors disabled:opacity-50">
            {submitting ? 'Création...' : "S'inscrire"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#2D6A4F] font-medium hover:underline">Se connecter</Link>
          </p>
        </form>

      </div>
    </div>
  )
}
