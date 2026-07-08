import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MapPin, Tag } from 'lucide-react'

const annoncesData = [
  { id: 1, titre: 'Vieille chaise en bois', categorie: 'Mobilier', localisation: 'Paris 10ème', type: 'Don', date: '20/04/2026', description: 'Chaise en bois massif, quelques égratignures mais solide.' },
  { id: 2, titre: 'Lot de tissus', categorie: 'Textile', localisation: 'Montreuil', type: 'Vente', date: '18/04/2026', description: 'Chutes de tissu variées, idéal pour upcycling créatif.' },
  { id: 3, titre: 'Cadres photo vintage', categorie: 'Décoration', localisation: 'Paris 13ème', type: 'Don', date: '15/04/2026', description: 'Lot de 5 cadres dorés, années 80.' },
  { id: 4, titre: 'Palette en bois', categorie: 'Mobilier', localisation: 'Ivry', type: 'Don', date: '12/04/2026', description: 'Palette standard en bon état, parfaite pour fabriquer des meubles.' },
]

export default function Annonces() {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const navigate = useNavigate()

  const filtrees = annoncesData.filter(a => {
    const matchRecherche = a.titre.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || a.type === filtre
    return matchRecherche && matchFiltre
  })

  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Annonces</h2>
          <p className="text-gray-500 text-sm mt-0.5">Objets disponibles à récupérer</p>
        </div>
        <button
          onClick={() => navigate('/annonces/nouvelle')}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Déposer
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] bg-white"
          />
        </div>
        <div className="flex gap-2">
          {['Tous', 'Don', 'Vente'].map(f => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                filtre === f
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtrees.length === 0 ? (
        <div className="text-center text-gray-400 py-16 text-sm">Aucune annonce trouvée.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrees.map(annonce => (
            <div key={annonce.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#2D2D2D]">{annonce.titre}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  annonce.type === 'Don'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-orange-50 text-orange-500'
                }`}>
                  {annonce.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{annonce.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {annonce.localisation}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={12} />
                  {annonce.categorie}
                </span>
                <span className="ml-auto">{annonce.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}