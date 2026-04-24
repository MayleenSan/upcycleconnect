import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Archive, CheckCircle } from 'lucide-react'

const conteneurs = [
  { id: 1, nom: 'Conteneur Lafayette', adresse: '174 rue La Fayette, Paris 10ème', places: 3 },
  { id: 2, nom: 'Conteneur Montreuil', adresse: '12 rue de la République, Montreuil', places: 1 },
  { id: 3, nom: 'Conteneur Ivry', adresse: '8 avenue de Paris, Ivry-sur-Seine', places: 5 },
  { id: 4, nom: 'Conteneur 13ème', adresse: '45 boulevard Auguste Blanqui, Paris 13ème', places: 2 },
]

export default function DemandeConteneur() {
  const [form, setForm] = useState({ objet: '', description: '', conteneur: '' })
  const [etape, setEtape] = useState(1) // 1 = formulaire, 2 = confirmation
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.objet || !form.description || !form.conteneur) return
    setEtape(2)
  }

  // code barre fictif
  const codeBarreFactice = 'UPC-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  return (
    <div>

      {/* header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/annonces')}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Déposer dans un conteneur</h2>
          <p className="text-gray-500 text-sm mt-0.5">Demande de dépôt d'un objet</p>
        </div>
      </div>

      {etape === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          {/* info */}
          <div className="bg-[#F8F4EE] rounded-xl p-4 mb-6 flex gap-3">
            <Archive size={18} className="text-[#2D6A4F] shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              Décris ton objet, choisis un conteneur et notre équipe vérifiera ta demande.
              Tu recevras ensuite un code pour ouvrir le conteneur.
            </p>
          </div>

          {/* nom objet */}
          <div className="mb-5">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom de l'objet</label>
            <input
              name="objet"
              type="text"
              placeholder="Ex: Lampe de bureau, vélo..."
              value={form.objet}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            />
          </div>

          {/* description */}
          <div className="mb-5">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Description et état</label>
            <textarea
              name="description"
              placeholder="Décris l'état de l'objet, ses dimensions, pourquoi tu t'en sépares..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
            />
          </div>

          {/* choix conteneur */}
          <div className="mb-6">
            <label className="text-sm font-medium text-[#2D2D2D] mb-3 block">Choisir un conteneur</label>
            <div className="flex flex-col gap-3">
              {conteneurs.map(c => (
                <button
                  key={c.id}
                  onClick={() => setForm({ ...form, conteneur: c.nom })}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                    form.conteneur === c.nom
                      ? 'border-[#2D6A4F] bg-green-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-[#2D2D2D]">{c.nom}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.adresse}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    c.places > 2 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                  }`}>
                    {c.places} place{c.places > 1 ? 's' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            Envoyer la demande
          </button>

        </div>
      )}

      {/* confirmation + code barre */}
      {etape === 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mx-auto mb-5">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Demande envoyée !</h3>
          <p className="text-gray-500 text-sm mb-6">
            Notre équipe va vérifier ton objet. Voici ton code de dépôt :
          </p>

          {/* code barre */}
          <div className="bg-[#F8F4EE] rounded-xl p-5 mb-6 inline-block w-full">
            <p className="text-xs text-gray-400 mb-2">Code de dépôt</p>
            <p className="text-2xl font-bold text-[#2D6A4F] tracking-widest">{codeBarreFactice}</p>
            <p className="text-xs text-gray-400 mt-2">Présente ce code au conteneur {form.conteneur}</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      )}

    </div>
  )
}