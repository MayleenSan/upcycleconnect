import { useState } from 'react'
import { Search, Plus, Tag, X } from 'lucide-react'

const baseCategories = [
  { id: 1, nom: "Mobilier", description: "Meubles chinés, abîmés ou oubliés qu'on remet au goût du jour", nbPrestations: 1 },
  { id: 2, nom: "Textile", description: "Fringues usées, rideaux défraîchis... tout mérite une seconde chance", nbPrestations: 1 },
  { id: 3, nom: "Électronique", description: "Vieilles lampes, gadgets en rade — on répare, on détourne, on réinvente", nbPrestations: 1 },
  { id: 4, nom: "Bijouterie", description: "Des déchets du quotidien transformés en pièces uniques à porter", nbPrestations: 1 },
  { id: 5, nom: "Mobilité douce", description: "Vélos rouillés et trottinettes fatiguées remis en selle", nbPrestations: 1 },
  { id: 6, nom: "Jardinage", description: "Récup et nature : on fait pousser des idées avec ce qu'on a sous la main", nbPrestations: 1 },
]

const emptyForm = { nom: '', description: '' }

export default function Categories() {
  const [categories, setCategories] = useState(baseCategories)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const displayed = categories.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleAdd = () => {
    if (!form.nom || !form.description) return
    setCategories(prev => [...prev, { id: Date.now(), nom: form.nom, description: form.description, nbPrestations: 0 }])
    closeModal()
  }

  const handleEdit = () => {
    if (!form.nom || !form.description) return
    setCategories(prev => prev.map(c => c.id === selected.id ? { ...c, nom: form.nom, description: form.description } : c))
    closeModal()
  }

  const handleDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== selected.id))
    closeModal()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Catégories</h2>
          <p className="text-gray-500 text-sm mt-1">{categories.length} catégories enregistrées</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setModal('ajouter') }}
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
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#F8F4EE] p-2.5 rounded-lg">
                <Tag size={18} className="text-[#2D6A4F]" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D]">{c.nom}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
                {c.nbPrestations} prestation{c.nbPrestations > 1 ? 's' : ''}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setSelected(c); setForm({ nom: c.nom, description: c.description }); setModal('modifier') }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => { setSelected(c); setModal('supprimer') }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">Aucune catégorie trouvée</div>
      )}

      {(modal === 'ajouter' || modal === 'modifier') && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">
              {modal === 'ajouter' ? 'Nouvelle catégorie' : 'Modifier la catégorie'}
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom</label>
                <input
                  value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                  placeholder="Ex: Mobilier"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Description de la catégorie..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={modal === 'ajouter' ? handleAdd : handleEdit}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
              >
                {modal === 'ajouter' ? 'Ajouter' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'supprimer' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Supprimer la catégorie ?</h3>
            <p className="text-gray-500 text-sm mb-6">
              La catégorie <strong>{selected.nom}</strong> sera définitivement supprimée.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}