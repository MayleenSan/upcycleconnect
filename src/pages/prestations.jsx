import { useState } from 'react'
import { Search, Plus, CheckCircle, XCircle, X } from 'lucide-react'

const basePrestations = [
  { id: 1, nom: "Seconde vie pour ton canapé", categorie: "Mobilier", prestataire: "Forge & Patine", prix: 90, statut: "Disponible" },
  { id: 2, nom: "Jean troué ? On arrange ça", categorie: "Textile", prestataire: "Brocante du Canal", prix: 18, statut: "Disponible" },
  { id: 3, nom: "Lampe DIY from scratch", categorie: "Électronique", prestataire: "Forge & Patine", prix: 55, statut: "Indisponible" },
  { id: 4, nom: "Bague en capsule de café", categorie: "Bijouterie", prestataire: "Brocante du Canal", prix: 30, statut: "Disponible" },
  { id: 5, nom: "Vélo remis sur roues", categorie: "Mobilité douce", prestataire: "Forge & Patine", prix: 40, statut: "Disponible" },
  { id: 6, nom: "Pot de fleurs en vinyle usé", categorie: "Jardinage", prestataire: "Brocante du Canal", prix: 22, statut: "Disponible" },
]

const categories = ["Mobilier", "Textile", "Électronique", "Bijouterie", "Mobilité douce", "Jardinage"]

const statusOptions = ['Tous', 'Disponible', 'Indisponible']

const emptyForm = { nom: '', categorie: 'Mobilier', prestataire: '', prix: '', statut: 'Disponible' }

export default function Prestations() {
  const [prestations, setPrestations] = useState(basePrestations)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const displayed = prestations.filter(p => {
    const matchSearch =
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.prestataire.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === 'Tous' || p.statut === activeFilter
    return matchSearch && matchFilter
  })

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleAdd = () => {
    if (!form.nom || !form.prestataire || !form.prix) return
    setPrestations(prev => [...prev, { ...form, id: Date.now(), prix: Number(form.prix) }])
    closeModal()
  }

  const handleDelete = () => {
    setPrestations(prev => prev.filter(p => p.id !== selected.id))
    closeModal()
  }

  const tableHeaders = ["Prestation", "Catégorie", "Prestataire", "Prix", "Statut", "Actions"]

  const textFields = [
    { key: 'nom', label: 'Nom de la prestation', type: 'text' },
    { key: 'prestataire', label: 'Prestataire', type: 'text' },
    { key: 'prix', label: 'Prix (€)', type: 'number' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Prestations</h2>
          <p className="text-gray-500 text-sm mt-1">{prestations.length} prestations enregistrées</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setModal('ajouter') }}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une prestation..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>
        <div className="flex gap-2">
          {statusOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === opt
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-gray-200 text-[#2D2D2D] hover:bg-[#F8F4EE]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#F8F4EE]">
              {tableHeaders.map(h => (
                <th key={h} className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((p, i) => (
              <tr
                key={p.id}
                className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{p.nom}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#74C69D]/20 text-[#2D6A4F]">
                    {p.categorie}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{p.prestataire}</td>
                <td className="px-6 py-4 font-semibold text-[#2D6A4F]">{p.prix} €</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium ${
                    p.statut === 'Disponible' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'
                  }`}>
                    {p.statut === 'Disponible' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {p.statut}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelected(p); setModal('voir') }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => { setSelected(p); setModal('supprimer') }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {displayed.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucune prestation trouvée</div>
        )}
      </div>

      {modal === 'voir' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">{selected.nom}</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400">Catégorie</span>
                <span className="font-medium">{selected.categorie}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Prestataire</span>
                <span className="font-medium">{selected.prestataire}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Prix</span>
                <span className="font-bold text-[#2D6A4F]">{selected.prix} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Statut</span>
                <span className={`font-medium ${selected.statut === 'Disponible' ? 'text-green-600' : 'text-red-500'}`}>
                  {selected.statut}
                </span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-full mt-6 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {modal === 'ajouter' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">Nouvelle prestation</h3>
            <div className="flex flex-col gap-4">
              {textFields.map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Catégorie</label>
                <select
                  value={form.categorie}
                  onChange={e => setForm({ ...form, categorie: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                >
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Statut</label>
                <select
                  value={form.statut}
                  onChange={e => setForm({ ...form, statut: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                >
                  <option>Disponible</option>
                  <option>Indisponible</option>
                </select>
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
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'supprimer' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Supprimer la prestation ?</h3>
            <p className="text-gray-500 text-sm mb-6">
              <strong>{selected.nom}</strong> sera définitivement supprimée.
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