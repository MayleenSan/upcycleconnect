import { useState } from 'react'
import { User, Mail, Phone, Save, CheckCircle, Briefcase } from 'lucide-react'

const fieldConfig = [
  ['prenom', 'Prénom', 'text'],
  ['nom', 'Nom', 'text'],
  ['email', 'Email', 'email'],
  ['telephone', 'Téléphone', 'tel'],
  ['poste', 'Poste', 'text'],
  ['specialite', 'Spécialité', 'text'],
  ['site', 'Site habituel', 'text'],
]

const wideFields = ['specialite', 'site']

export default function Profil() {
  const [form, setForm] = useState({
    prenom: 'Camille',
    nom: 'Renard',
    email: 'camille@upcycleconnect.fr',
    telephone: '06 98 76 54 32',
    poste: 'Animatrice / Formatrice',
    specialite: 'Textile, Upcycling créatif',
    site: 'Paris 11ème',
  })
  const [saved, setSaved] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon profil</h2>
        <p className="text-gray-500 text-sm mt-0.5">Informations de votre compte salarié</p>
      </div>

      {saved && (
        <div className="mb-5 px-4 py-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600 flex items-center gap-2">
          <CheckCircle size={16} />
          Profil mis à jour avec succès !
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#2D6A4F] flex items-center justify-center text-white text-3xl font-bold mb-4">
            {form.prenom[0]}
          </div>
          <p className="font-semibold text-[#2D2D2D]">{form.prenom} {form.nom}</p>
          <p className="text-sm text-gray-400 mt-0.5">{form.poste}</p>
          <span className="mt-3 text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
            Salarié temps partiel
          </span>
          <div className="mt-4 w-full pt-4 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={13} className="text-[#2D6A4F]" />{form.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone size={13} className="text-[#2D6A4F]" />{form.telephone}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Briefcase size={13} className="text-[#2D6A4F]" />{form.site}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
              <User size={16} className="text-[#2D6A4F]" />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldConfig.map(([name, label, type]) => (
                <div key={name} className={wideFields.includes(name) ? 'sm:col-span-2' : ''}>
                  <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-[#2D6A4F] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            <Save size={16} />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  )
}