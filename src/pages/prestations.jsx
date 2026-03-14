import { useState } from 'react'
import { prestations } from '../data/prestations'
import { Search, Plus, CheckCircle, XCircle } from 'lucide-react'

export default function Prestations() {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')

  const filtres = ['Tous', 'Disponible', 'Indisponible']

  const prestationsFiltrees = prestations.filter(p => {
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      p.prestataire.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || p.statut === filtre
    return matchRecherche && matchFiltre
  })

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Prestations</h2>
          <p className="text-gray-500 text-sm mt-1">{prestations.length} prestations enregistrées</p>
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
            placeholder="Rechercher une prestation..."
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

      {/* Tableau */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#F8F4EE]">
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Prestation</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Catégorie</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Prestataire</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Prix</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Statut</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prestationsFiltrees.map((p, index) => (
              <tr key={p.id} className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{p.nom}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#74C69D]/20 text-[#2D6A4F]">
                    {p.categorie}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{p.prestataire}</td>
                <td className="px-6 py-4 font-semibold text-[#2D6A4F]">{p.prix} €</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium
                    ${p.statut === 'Disponible' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
                    {p.statut === 'Disponible' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {p.statut}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">
                      Voir
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {prestationsFiltrees.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Aucune prestation trouvée
          </div>
        )}
      </div>
    </div>
  )
}