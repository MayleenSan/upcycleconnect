import { useState } from 'react'
import { Search, MapPin, Tag, Archive, Filter } from 'lucide-react'

const annonces = [
  { id: 1, titre: 'Vieille chaise en bois', categorie: 'Mobilier', localisation: 'Paris 10ème', type: 'Don', date: '20/04/2026', description: 'Chaise en bois massif, quelques égratignures mais solide.' },
  { id: 2, titre: 'Lot de tissus variés', categorie: 'Textile', localisation: 'Montreuil', type: 'Vente', date: '18/04/2026', description: 'Chutes de tissu variées, idéal pour upcycling créatif. Prix 15€/kg.' },
  { id: 3, titre: 'Cadres photo vintage', categorie: 'Décoration', localisation: 'Paris 13ème', type: 'Don', date: '15/04/2026', description: 'Lot de 5 cadres dorés, années 80.' },
  { id: 4, titre: 'Palette en bois', categorie: 'Mobilier', localisation: 'Ivry', type: 'Don', date: '12/04/2026', description: 'Palette standard en bon état, parfaite pour fabriquer des meubles.' },
  { id: 5, titre: 'Câbles cuivre récupérés', categorie: 'Électronique', localisation: 'Bourg-la-Reine', type: 'Vente', date: '10/04/2026', description: 'Lot de câbles cuivre 2.5mm², 50m environ.' },
  { id: 6, titre: 'Vêtements laine', categorie: 'Textile', localisation: 'Paris 16ème', type: 'Don', date: '08/04/2026', description: 'Pulls et manteaux laine, parfaits pour récupérer la fibre.' },
]

const conteneurs = [
  { id: 1, nom: 'Conteneur Lafayette', adresse: '174 rue La Fayette, Paris 10ème', places: 3 },
  { id: 2, nom: 'Conteneur Montreuil', adresse: '12 rue de la République, Montreuil', places: 1 },
  { id: 3, nom: 'Conteneur Ivry', adresse: '8 avenue de Paris, Ivry-sur-Seine', places: 5 },
]

const categories = ['Toutes', 'Mobilier', 'Textile', 'Décoration', 'Électronique']
const typeOptions = ['Tous', 'Don', 'Vente']

const genCode = () => 'PRO-' + Math.random().toString(36).substring(2, 8).toUpperCase()

export default function Annonces() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [activeCategory, setActiveCategory] = useState('Toutes')
  const [selectedAnnonce, setSelectedAnnonce] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedConteneur, setSelectedConteneur] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [code] = useState(genCode)

  const displayed = annonces.filter(a => {
    const matchSearch = a.titre.toLowerCase().includes(search.toLowerCase())
    const matchType = activeFilter === 'Tous' || a.type === activeFilter
    const matchCat = activeCategory === 'Toutes' || a.categorie === activeCategory
    return matchSearch && matchType && matchCat
  })

  const handleConfirm = () => {
    if (!selectedConteneur) return
    setConfirmed(true)
    setTimeout(() => {
      setShowModal(false)
      setConfirmed(false)
      setSelectedConteneur('')
    }, 2000)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedConteneur('')
    setConfirmed(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Annonces disponibles</h2>
        <p className="text-gray-500 text-sm mt-0.5">Matériaux et objets à récupérer</p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un matériau..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] bg-white"
            />
          </div>
          <div className="flex gap-2">
            {typeOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === opt
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <Filter size={14} className="text-gray-400" />
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === c
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {displayed.length === 0 ? (
        <div className="text-center text-gray-400 py-16 text-sm">Aucune annonce trouvée.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map(a => (
            <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#2D2D2D]">{a.titre}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-2 ${
                  a.type === 'Don' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                }`}>
                  {a.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{a.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1"><MapPin size={12} />{a.localisation}</span>
                <span className="flex items-center gap-1"><Tag size={12} />{a.categorie}</span>
                <span className="ml-auto">{a.date}</span>
              </div>
              <button
                onClick={() => { setSelectedAnnonce(a); setShowModal(true) }}
                className="w-full flex items-center justify-center gap-2 bg-[#2D6A4F] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
              >
                <Archive size={15} />
                Récupérer dans un conteneur
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedAnnonce && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            {!confirmed ? (
              <>
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-1">Récupérer l'objet</h3>
                <p className="text-sm text-gray-500 mb-5">
                  <strong>{selectedAnnonce.titre}</strong> — Choisissez un conteneur pour récupérer cet objet.
                </p>
                <div className="flex flex-col gap-3 mb-5">
                  {conteneurs.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedConteneur(c.nom)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                        selectedConteneur === c.nom
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
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
                  >
                    Confirmer
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Archive size={28} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Code de récupération</h3>
                <div className="bg-[#F8F4EE] rounded-xl p-4 my-4">
                  <p className="text-2xl font-bold text-[#2D6A4F] tracking-widest">{code}</p>
                  <p className="text-xs text-gray-400 mt-1">Présentez ce code au {selectedConteneur}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}