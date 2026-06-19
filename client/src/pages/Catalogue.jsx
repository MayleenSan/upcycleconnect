import { useState } from 'react'
import { ShoppingBag, Calendar, Clock, MapPin, X } from 'lucide-react'

const items = [
  { id: 1, type: 'Formation', titre: 'Initiation à l\'upcycling textile', prix: 35, duree: '3h', lieu: 'Paris 10ème', date: '02/05/2026', places: 8, description: 'Apprenez à transformer vos vieux vêtements en créations uniques avec nos formateurs.' },
  { id: 2, type: 'Atelier', titre: 'Fabriquer un meuble avec des palettes', prix: 50, duree: '4h', lieu: 'Montreuil', date: '10/05/2026', places: 6, description: 'Atelier pratique pour créer une table basse ou une étagère à partir de palettes récupérées.' },
  { id: 3, type: 'Événement', titre: 'Marché de l\'upcycling', prix: 0, duree: 'Journée', lieu: 'Paris 13ème', date: '15/05/2026', places: 50, description: 'Grand marché communautaire pour échanger, vendre et découvrir des créations upcyclées.' },
  { id: 4, type: 'Formation', titre: 'Upcycling et décoration intérieure', prix: 45, duree: '3h', lieu: 'Paris 16ème', date: '20/05/2026', places: 10, description: 'Donnez une seconde vie à vos objets déco et transformez votre intérieur.' },
  { id: 5, type: 'Atelier', titre: 'Bijoux à partir de matériaux recyclés', prix: 25, duree: '2h', lieu: 'Bourg-la-Reine', date: '22/05/2026', places: 12, description: 'Créez vos propres bijoux originaux à partir de chutes de métal et de tissu.' },
  { id: 6, type: 'Événement', titre: 'Conférence économie circulaire', prix: 0, duree: '2h', lieu: 'Paris 11ème', date: '28/05/2026', places: 30, description: 'Conférence ouverte à tous sur les enjeux de l\'économie circulaire et du recyclage créatif.' },
]

export default function Catalogue() {
  const [filtre, setFiltre] = useState('Tous')
  const [selected, setSelected] = useState(null)
  const [reserve, setReserve] = useState(false)

  const filtres = ['Tous', 'Formation', 'Atelier', 'Événement']

  const filtres_items = items.filter(i => filtre === 'Tous' || i.type === filtre)

  const couleurType = (type) => {
    if (type === 'Formation') return 'bg-blue-50 text-blue-500'
    if (type === 'Atelier') return 'bg-purple-50 text-purple-500'
    return 'bg-orange-50 text-orange-500'
  }

  const handleReserver = () => {
    setReserve(true)
    setTimeout(() => {
      setSelected(null)
      setReserve(false)
    }, 2000)
  }

  return (
    <div>

      {/* header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Catalogue</h2>
        <p className="text-gray-500 text-sm mt-0.5">Formations, ateliers et événements</p>
      </div>

      {/* filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filtres.map(f => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtre === f
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtres_items.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${couleurType(item.type)}`}>
                {item.type}
              </span>
              <span className="text-sm font-bold text-[#2D6A4F]">
                {item.prix === 0 ? 'Gratuit' : `${item.prix}€`}
              </span>
            </div>
            <h3 className="font-semibold text-[#2D2D2D] mb-3 leading-snug">{item.titre}</h3>
            <div className="flex flex-col gap-1.5 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><Calendar size={12} />{item.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} />{item.duree}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} />{item.lieu}</span>
            </div>
          </div>
        ))}
      </div>

      {/* modal detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
            <button
              onClick={() => { setSelected(null); setReserve(false) }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${couleurType(selected.type)}`}>
              {selected.type}
            </span>

            <h3 className="text-xl font-bold text-[#2D2D2D] mt-3 mb-2">{selected.titre}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{selected.description}</p>

            <div className="flex flex-col gap-2 mb-5 text-sm text-gray-500">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#2D6A4F]" />{selected.date}</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-[#2D6A4F]" />{selected.duree}</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-[#2D6A4F]" />{selected.lieu}</span>
              <span className="flex items-center gap-2"><ShoppingBag size={14} className="text-[#2D6A4F]" />{selected.places} places disponibles</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#2D6A4F]">
                {selected.prix === 0 ? 'Gratuit' : `${selected.prix}€`}
              </span>
            </div>

            {reserve ? (
              <div className="w-full py-2.5 text-center bg-green-50 text-green-600 rounded-lg text-sm font-medium">
                Réservation confirmée !
              </div>
            ) : (
              <button
                onClick={handleReserver}
                className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
              >
                {selected.prix === 0 ? 'S\'inscrire' : `Réserver — ${selected.prix}€`}
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  )
}