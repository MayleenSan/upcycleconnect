import { useState, useEffect } from 'react'
import { getCategories } from '../services/api'
import { Search, Plus, Tag } from 'lucide-react'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const categoriesFiltrees = categories.filter(c =>
    c.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(recherche.toLowerCase())
  )

  if (loading) return <p className="text-gray-500 text-sm">Chargement...</p>
  if (error) return <p className="text-red-500 text-sm">Erreur : {error}</p>

  return (
    <div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesFiltrees.map(c => (
          <div key={c.id_categories} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#F8F4EE] p-2.5 rounded-lg">
                <Tag size={18} className="text-[#2D6A4F]" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D]">{c.nom}</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.description || '—'}</p>

            <div className="flex items-center justify-end gap-2">
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

      {categoriesFiltrees.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Aucune catégorie trouvée
        </div>
      )}
    </div>
  )
}
