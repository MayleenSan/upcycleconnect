import { useState, useEffect } from 'react'
import { getUsers, createUser, deleteUser } from '../services/api'
import { Search, UserPlus, X } from 'lucide-react'

export default function Utilisateurs() {
  const [users, setUsers] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', mail: '', password: '',
    phone: '', address: '', role: 'particulier', language: 'fr'
  })

  const charger = () => {
    getUsers()
      .then(data => { setUsers(data || []); setChargement(false) })
      .catch(err => { setErreur(err.message); setChargement(false) })
  }

  useEffect(() => { charger() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createUser(form)
      setShowModal(false)
      setForm({ first_name: '', last_name: '', mail: '', password: '', phone: '', address: '', role: 'particulier', language: 'fr' })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }
  const handleDelete = async (id) => {
    const reponse = window.confirm("Tu veux vraiment supprimer cet utilisateur ?")
    if (reponse){
      await deleteUser(id)
      charger()
    }

  }

  const filtres = ['Tous', 'particulier', 'professionnel', 'salarie', 'admin']

  const utilisateursFiltres = users.filter(u => {
    const nom = `${u.first_name} ${u.last_name}`.toLowerCase()
    const matchRecherche = nom.includes(recherche.toLowerCase()) ||
      u.mail.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || u.role === filtre
    return matchRecherche && matchFiltre
  })

  if (chargement) return <div className="text-center py-12 text-gray-400">Chargement...</div>
  if (erreur) return <div className="text-center py-12 text-red-500">{erreur}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Utilisateurs</h2>
          <p className="text-gray-500 text-sm mt-1">{users.length} utilisateurs enregistrés</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
            {utilisateursFiltres.map((u, index) => (
              <tr key={u.id_users} className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{u.first_name} {u.last_name}</td>
                <td className="px-6 py-4 text-gray-500">{u.mail}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${u.role === 'admin' ? 'bg-[#2D6A4F] text-white' :
                      u.role === 'professionnel' ? 'bg-[#74C69D]/30 text-[#2D6A4F]' :
                      'bg-gray-100 text-gray-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {u.language || 'fr'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                    onClick={() => handleDelete(u.id_users)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {utilisateursFiltres.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Aucun utilisateur trouvé
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Nouvel utilisateur</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input required type="text" value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input required type="text" value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.mail}
                  onChange={e => setForm({ ...form, mail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                <input required type="password" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                  <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                  <option value="particulier">Particulier</option>
                  <option value="professionnel">Professionnel</option>
                  <option value="salarie">Salarié</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit" disabled={submitting}
                  className="px-4 py-2 text-sm rounded-lg bg-[#2D6A4F] text-white hover:bg-[#245a42] disabled:opacity-50">
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