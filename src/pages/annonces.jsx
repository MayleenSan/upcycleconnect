import { useState, useEffect } from 'react'
import { getAnnonces, createAnnonce, deleteAnnonce, updateAnnonce, getCategories } from '../services/api'
import { Search, Plus, X, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function Annonces() {
  const [annonces, setAnnonces] = useState([])
  const [categories, setCategories] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    titre: '', description: '', prix: '', etat: 'bon', statut: 'en_attente',
    id_categories: '', id_users: ''
  })

  const charger = () => {
    getAnnonces()
      .then(data => { setAnnonces(data || []); setChargement(false) })
      .catch(err => { setErreur(err.message); setChargement(false) })
  }

  useEffect(() => {
    charger()
    getCategories().then(data => setCategories(data || [])).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createAnnonce({
        ...form,
        prix: parseFloat(form.prix) || 0,
        id_categories: parseInt(form.id_categories) || 0,
        id_users: parseInt(form.id_users) || 0,
      })
      setShowModal(false)
      setForm({ titre: '', description: '', prix: '', etat: 'bon', statut: 'en_attente', id_categories: '', id_users: '' })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette annonce ?')) {
      await deleteAnnonce(id)
      charger()
    }
  }

  const handleValidation = async (annonce, nouveauStatut) => {
    try {
      await updateAnnonce(annonce.id_annonce, { ...annonce, statut: nouveauStatut })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    }
  }

  const filtres = ['Tous', 'en_attente', 'valide', 'refuse']

  const annoncesFiltrees = annonces.filter(a => {
    const matchRecherche = a.titre.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || a.statut === filtre
    return matchRecherche && matchFiltre
  })

  const badgeStatut = (statut) => {
    if (statut === 'valide') return <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"><CheckCircle size={12} /> validé</span>
    if (statut === 'refuse') return <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-500"><XCircle size={12} /> refusé</span>
    return <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700"><Clock size={12} /> en attente</span>
  }

  if (chargement) return <p className="text-gray-500 text-sm">Chargement...</p>
  if (erreur) return <p className="text-red-500 text-sm">Erreur : {erreur}</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Annonces</h2>
          <p className="text-gray-500 text-sm mt-1">{annonces.length} annonces enregistrées</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
            placeholder="Rechercher une annonce..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>
        <div className="flex gap-2">
          {filtres.map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${filtre === f ? 'bg-[#2D6A4F] text-white' : 'bg-white border border-gray-200 text-[#2D2D2D] hover:bg-[#F8F4EE]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#F8F4EE]">
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Titre</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Prix</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">État</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Statut</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {annoncesFiltrees.map((a, index) => (
              <tr key={a.id_annonce} className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{a.titre}</td>
                <td className="px-6 py-4 font-semibold text-[#2D6A4F]">{a.prix} €</td>
                <td className="px-6 py-4 text-gray-500">{a.etat}</td>
                <td className="px-6 py-4">{badgeStatut(a.statut)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {a.statut !== 'valide' && (
                      <button
                        onClick={() => handleValidation(a, 'valide')}
                        className="text-xs px-3 py-1.5 rounded-lg border border-green-200 text-green-700 hover:bg-green-50 transition-colors">
                        Valider
                      </button>
                    )}
                    {a.statut !== 'refuse' && (
                      <button
                        onClick={() => handleValidation(a, 'refuse')}
                        className="text-xs px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors">
                        Refuser
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(a.id_annonce)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {annoncesFiltrees.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucune annonce trouvée</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Nouvelle annonce</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input required type="text" value={form.titre}
                  onChange={e => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€) *</label>
                  <input required type="number" min="0" step="0.01" value={form.prix}
                    onChange={e => setForm({ ...form, prix: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
                  <select value={form.etat} onChange={e => setForm({ ...form, etat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                    <option value="neuf">Neuf</option>
                    <option value="bon">Bon</option>
                    <option value="usé">Usé</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select value={form.id_categories} onChange={e => setForm({ ...form, id_categories: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                    <option value="">— choisir —</option>
                    {categories.map(c => (
                      <option key={c.id_categories} value={c.id_categories}>{c.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                    <option value="en_attente">En attente</option>
                    <option value="valide">Validé</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID utilisateur (auteur)</label>
                <input type="number" min="1" value={form.id_users}
                  onChange={e => setForm({ ...form, id_users: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
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
