import { useState } from 'react'
import { Search, UserPlus, CheckCircle, XCircle, X, User, Mail, Shield } from 'lucide-react'

const baseUsers = [
  { id: 1, nom: "Caron Elise", email: "elise.caron@gmail.com", type: "Particulier", statut: "Actif" },
  { id: 2, nom: "Petit Sacha", email: "sacha.petit@orange.fr", type: "Particulier", statut: "Actif" },
  { id: 3, nom: "Forge & Patine", email: "contact@forgepatine.fr", type: "Prestataire", statut: "Actif" },
  { id: 4, nom: "Brocante du Canal", email: "hello@brocanteducanal.fr", type: "Prestataire", statut: "Inactif" },
  { id: 5, nom: "Renard Camille", email: "camille@upcycleconnect.fr", type: "Admin", statut: "Actif" },
  { id: 6, nom: "Moulin Axel", email: "axel.moulin@proton.me", type: "Particulier", statut: "Inactif" },
]

const typeOptions = ['Tous', 'Particulier', 'Prestataire', 'Admin']

const emptyForm = { nom: '', email: '', type: 'Particulier', statut: 'Actif' }

export default function Utilisateurs() {
  const [users, setUsers] = useState(baseUsers)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const displayed = users.filter(u => {
    const matchSearch =
      u.nom.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchType = activeFilter === 'Tous' || u.type === activeFilter
    return matchSearch && matchType
  })

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleAdd = () => {
    if (!form.nom.trim() || !form.email.trim()) return
    setUsers(prev => [...prev, { ...form, id: Date.now() }])
    closeModal()
  }

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== selected.id))
    closeModal()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Utilisateurs</h2>
          <p className="text-gray-500 text-sm mt-1">{users.length} utilisateurs enregistrés</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setModal('ajouter') }}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <UserPlus size={16} />
          Ajouter
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>
        <div className="flex gap-2">
          {typeOptions.map(opt => (
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
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Nom</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Type</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Statut</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((u, i) => (
              <tr
                key={u.id}
                className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{u.nom}</td>
                <td className="px-6 py-4 text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    u.type === 'Admin'
                      ? 'bg-[#2D6A4F] text-white'
                      : u.type === 'Prestataire'
                      ? 'bg-[#74C69D]/30 text-[#2D6A4F]'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {u.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium ${
                    u.statut === 'Actif' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'
                  }`}>
                    {u.statut === 'Actif' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {u.statut}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelected(u); setModal('voir') }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => { setSelected(u); setModal('supprimer') }}
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
          <div className="text-center py-12 text-gray-400 text-sm">Aucun utilisateur trouvé</div>
        )}
      </div>

      {modal === 'voir' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-xl font-bold">
                {selected.nom[0]}
              </div>
              <div>
                <p className="font-semibold text-[#2D2D2D]">{selected.nom}</p>
                <p className="text-sm text-gray-400">{selected.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User size={15} className="text-[#2D6A4F]" />
                Type : <span className="font-medium">{selected.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={15} className="text-[#2D6A4F]" />
                Email : <span className="font-medium">{selected.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield size={15} className="text-[#2D6A4F]" />
                Statut :{' '}
                <span className={`font-medium ${selected.statut === 'Actif' ? 'text-green-600' : 'text-red-500'}`}>
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
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">Nouvel utilisateur</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nom</label>
                <input
                  value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                  placeholder="Nom complet"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Email</label>
                <input
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="exemple@mail.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                >
                  <option>Particulier</option>
                  <option>Prestataire</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Statut</label>
                <select
                  value={form.statut}
                  onChange={e => setForm({ ...form, statut: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                >
                  <option>Actif</option>
                  <option>Inactif</option>
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
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Supprimer l'utilisateur ?</h3>
            <p className="text-gray-500 text-sm mb-6">
              L'utilisateur <strong>{selected.nom}</strong> sera définitivement supprimé.
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