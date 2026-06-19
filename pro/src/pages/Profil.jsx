import { useState } from 'react'
import { User, Mail, Phone, MapPin, Building, Save, CheckCircle } from 'lucide-react'

const fieldConfig = [
  ['nom', 'Nom complet', 'text'],
  ['entreprise', 'Entreprise / Atelier', 'text'],
  ['email', 'Email', 'email'],
  ['telephone', 'Téléphone', 'tel'],
  ['adresse', 'Adresse', 'text'],
  ['specialites', 'Spécialités', 'text'],
]

const accountTypes = ['Artisan', 'Entreprise']

export default function Profil() {
  const [form, setForm] = useState({
    nom: 'Jean Dupont',
    entreprise: 'Forge & Patine',
    type: 'Artisan',
    email: 'contact@forgepatine.fr',
    telephone: '06 12 34 56 78',
    adresse: '12 rue des Artisans, Paris 11ème',
    description: "Atelier spécialisé dans la transformation de mobilier vintage et la création de pièces uniques à partir de matériaux de récupération.",
    specialites: 'Mobilier, Métal, Bois',
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
        <p className="text-gray-500 text-sm mt-0.5">Informations de votre compte professionnel</p>
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
            {form.nom[0]}
          </div>
          <p className="font-semibold text-[#2D2D2D]">{form.nom}</p>
          <p className="text-sm text-gray-400 mt-0.5">{form.entreprise}</p>
          <span className="mt-3 text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
            {form.type}
          </span>
          <div className="mt-4 w-full pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Mail size={13} className="text-[#2D6A4F]" />{form.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Phone size={13} className="text-[#2D6A4F]" />{form.telephone}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={13} className="text-[#2D6A4F]" />{form.adresse}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
              <Building size={16} className="text-[#2D6A4F]" />
              Informations professionnelles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldConfig.map(([name, label, type]) => (
                <div key={name}>
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
            <div className="mt-4">
              <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Description de l'activité</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
              <User size={16} className="text-[#2D6A4F]" />
              Type de compte
            </h3>
            <div className="flex gap-3">
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