import { useState, useEffect } from 'react'
import { getCategories, createCategorie, deleteCategorie } from '../services/api'
import { Search, Plus, Tag, X } from 'lucide-react'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recherche, setRecherche] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nom: '', description: '' })
  const [submitting, setSubmitting] = useState(false)

  const charger = () => {
    getCategories()
      .then(data => { setCategories(data || []); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }

  useEffect(() => { charger() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createCategorie(form)
      setShowModal(false)
      setForm({ nom: '', description: '' })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette catégorie ?')) {
      try { await deleteCategorie(id); charger() }
      catch (err) { alert('Erreur : ' + err.message) }
    }
  }

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
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
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
              <button onClick={() => handleDelete(c.id_categories)} className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {categoriesFiltrees.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">Aucune catégorie trouvée</div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Nouvelle catégorie</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  required
                  type="text"
                  value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm rounded-lg bg-[#2D6A4F] text-white hover:bg-[#245a42] disabled:opacity-50"
                >
                  {submitting ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
