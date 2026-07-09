import { useState } from 'react'
import { User, Mail, MapPin, Phone, Save, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Profil() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [form, setForm] = useState({
    prenom: 'Mayleen',
    nom: 'San',
    email: 'mayleen@mail.com',
    telephone: '06 12 34 56 78',
    ville: 'Paris',
  })
  const [succes, setSucces] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSucces(false)
  }

  const handleSave = () => {
    setSucces(true)
    setTimeout(() => setSucces(false), 2500)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon Profil</h2>
        <p className="text-gray-500 text-sm mt-0.5">Gérer tes informations personnelles</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {form.prenom[0]}{form.nom[0]}
        </div>
        <div>
          <p className="font-semibold text-[#2D2D2D]">{form.prenom} {form.nom}</p>
          <p className="text-sm text-gray-400">{form.email}</p>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600 mt-1 inline-block">
            Particulier
          </span>
        </div>
      </div>

      {succes && (
        <div className="mb-4 px-4 py-2.5 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600">
          Modifications enregistrées !
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <h3 className="font-semibold text-[#2D2D2D] mb-5">Informations personnelles</h3>

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Prénom</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="prenom"
                type="text"
                value={form.prenom}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom</label>
            <input
              name="nom"
              type="text"
              value={form.nom}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
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
              value={form.email}
              onChange={handleChange}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Téléphone</label>
          <div className="relative">
            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="telephone"
              type="text"
              value={form.telephone}
              onChange={handleChange}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Ville</label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="ville"
              type="text"
              value={form.ville}
              onChange={handleChange}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors flex items-center justify-center gap-2"
        >
          <Save size={15} />
          Enregistrer les modifications
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-[#2D2D2D] mb-1">Déconnexion</h3>
        <p className="text-gray-400 text-sm mb-4">Tu seras redirigé vers la page de connexion.</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 font-medium hover:text-red-600 transition-colors"
        >
          <LogOut size={15} />
          Se déconnecter
        </button>
      </div>

    </div>
  )
}