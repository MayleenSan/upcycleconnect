import { useState } from 'react'
import { categories } from '../data/categories'
import { Search, Plus, Tag } from 'lucide-react'

export default function Categories() {
  const [recherche, setRecherche] = useState('')

  const categoriesFiltrees = categories.filter(c =>
    c.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    c.description.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div>
      {/* en tete */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Catégories</h2>
          <p className="text-gray-500 text-sm mt-1">{categories.length} catégories enregistrées</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      {/* recherche */}
      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
        />
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesFiltrees.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            
            {/* icone et nom */}
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#F8F4EE] p-2.5 rounded-lg">
                <Tag size={18} className="text-[#2D6A4F]" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D]">{c.nom}</h3>
            </div>

            {/* description */}
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.description}</p>

            {/* nb prestations */}
            <div className="flex items-center justify-between">
              <span className="text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
                {c.nbPrestations} prestation{c.nbPrestations > 1 ? 's' : ''}
              </span>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">
                  Modifier
                </button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {categoriesFiltrees.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Aucune catégorie trouvée
        </div>
      )}
    </div>
  )
}