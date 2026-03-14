import { useState } from 'react'
import { evenements } from '../data/evenements'
import { Search, Plus, MapPin, Calendar, Users } from 'lucide-react'

export default function Evenements() {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')

  const filtres = ['Tous', 'Ouvert', 'Complet']

  const evenementsFiltres = evenements.filter(e => {
    const matchRecherche = e.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      e.lieu.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || e.statut === filtre
    return matchRecherche && matchFiltre
  })

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Événements</h2>
          <p className="text-gray-500 text-sm mt-1">{evenements.length} événements enregistrés</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      {/* Filtres + Recherche */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>
        <div className="flex gap-2">
          {filtres.map(f => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${filtre === f
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-gray-200 text-[#2D2D2D] hover:bg-[#F8F4EE]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {evenementsFiltres.map(e => (
          <div key={e.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">

            {/* Type + Statut */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
                {e.type}
              </span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full
                ${e.statut === 'Ouvert' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
                {e.statut}
              </span>
            </div>

            {/* Nom */}
            <h3 className="font-semibold text-[#2D2D2D] mb-3">{e.nom}</h3>

            {/* Infos */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} className="text-[#2D6A4F]" />
                {new Date(e.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-[#2D6A4F]" />
                {e.lieu}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users size={14} className="text-[#2D6A4F]" />
                {e.placesRestantes} / {e.places} places restantes
              </div>
            </div>

            {/* Barre de remplissage */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
              <div
                className="bg-[#2D6A4F] h-1.5 rounded-full transition-all"
                style={{ width: `${((e.places - e.placesRestantes) / e.places) * 100}%` }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">
                Voir
              </button>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">
                Modifier
              </button>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                Supprimer
              </button>
            </div>

          </div>
        ))}
      </div>

      {evenementsFiltres.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Aucun événement trouvé
        </div>
      )}
    </div>
  )
}