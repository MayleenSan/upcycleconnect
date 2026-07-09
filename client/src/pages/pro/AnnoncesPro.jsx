import { useState } from 'react'
import { Search, MapPin, Tag, Filter } from 'lucide-react'

const annonces = [
  { id: 1, titre: 'Vieille chaise en bois', categorie: 'Mobilier', lieu: 'Paris 10ème', type: 'Don', date: '20/04/2026', desc: 'Chaise en bois massif, quelques égratignures mais solide. Parfaite pour upcycling.' },
  { id: 2, titre: 'Lot de tissus variés', categorie: 'Textile', lieu: 'Montreuil', type: 'Don', date: '18/04/2026', desc: 'Chutes de tissu de différentes matières, idéal pour créations textiles.' },
  { id: 3, titre: 'Cadres photo vintage', categorie: 'Décoration', lieu: 'Paris 13ème', type: 'Vente', date: '15/04/2026', desc: 'Lot de 5 cadres dorés années 80. Prix : 15€ le lot.' },
  { id: 4, titre: 'Palette en bois', categorie: 'Mobilier', lieu: 'Ivry', type: 'Don', date: '12/04/2026', desc: 'Palette standard en bon état, idéale pour fabriquer meubles ou jardinières.' },
  { id: 5, titre: 'Bobines de fil industriel', categorie: 'Textile', lieu: 'Bourg-la-Reine', type: 'Don', date: '10/04/2026', desc: 'Plusieurs bobines de fil de couture partiellement utilisées.' },
  { id: 6, titre: 'Vieux vélo de ville', categorie: 'Transport', lieu: 'Paris 16ème', type: 'Vente', date: '08/04/2026', desc: 'Cadre aluminium, roues 26 pouces, freins à réviser. Prix : 30€.' },
]

export default function AnnoncesPro() {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const [categorie, setCategorie] = useState('Toutes')

  const cats = ['Toutes', 'Mobilier', 'Textile', 'Décoration', 'Transport']

  const filtrees = annonces.filter(a => {
    const matchR = a.titre.toLowerCase().includes(recherche.toLowerCase())
    const matchT = filtre === 'Tous' || a.type === filtre
    const matchC = categorie === 'Toutes' || a.categorie === categorie
    return matchR && matchT && matchC
  })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Annonces disponibles</h2>
        <p className="text-gray-500 text-sm mt-0.5">Matériaux et objets à récupérer pour vos projets</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher..." value={recherche} onChange={e => setRecherche(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] bg-white" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Tous', 'Don', 'Vente'].map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${filtre === f ? 'bg-[#2D6A4F] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <Filter size={15} className="text-gray-400 self-center" />
        {cats.map(c => (
          <button key={c} onClick={() => setCategorie(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categorie === c ? 'bg-[#74C69D] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
            {c}
          </button>
        ))}
      </div>

      {filtrees.length === 0 ? (
        <p className="text-center text-gray-400 py-16 text-sm">Aucune annonce trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrees.map(a => (
            <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#2D2D2D]">{a.titre}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${a.type === 'Don' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                  {a.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{a.desc}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><MapPin size={12} />{a.lieu}</span>
                <span className="flex items-center gap-1"><Tag size={12} />{a.categorie}</span>
                <span className="ml-auto">{a.date}</span>
              </div>
              <button className="mt-4 w-full py-2 rounded-lg bg-[#F8F4EE] text-[#2D6A4F] text-sm font-medium hover:bg-[#2D6A4F] hover:text-white transition-colors">
                Contacter le déposant
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}