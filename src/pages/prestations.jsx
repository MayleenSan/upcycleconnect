import { useEffect, useState } from 'react'
import { getPrestations, createPrestation } from '../services/api'
import { Search, Plus, CheckCircle, XCircle, X } from 'lucide-react'

export default function Prestations() {
  const [prestations, setPrestations] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    nom: '', description: '', tarif: '', capacite_max: '', duree: '', statut: 'actif'
  })

  const charger = () => {
    getPrestations()
      .then(data => { setPrestations(data || []); setChargement(false) })
      .catch(err => { setErreur(err.message); setChargement(false) })
  }

  useEffect(() => { charger() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createPrestation({
        ...form,
        tarif: parseFloat(form.tarif) || 0,
        capacite_max: parseInt(form.capacite_max) || 0,
        duree: parseInt(form.duree) || 0,
      })
      setShowModal(false)
      setForm({ nom: '', description: '', tarif: '', capacite_max: '', duree: '', statut: 'actif' })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const filtres = ['Tous', 'actif', 'inactif']

  const prestationsFiltrees = prestations.filter(p => {
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || p.statut === filtre
    return matchRecherche && matchFiltre
  })

  if (chargement) return <p className="text-gray-500 text-sm">Chargement...</p>
  if (erreur) return <p className="text-red-500 text-sm">Erreur : {erreur}</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Prestations</h2>
          <p className="text-gray-500 text-sm mt-1">{prestations.length} prestations enregistrées</p>
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
            placeholder="Rechercher une prestation..."
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
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Prestation</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Tarif</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Durée (min)</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Statut</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prestationsFiltrees.map((p, index) => (
              <tr key={p.id_prestation} className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{p.nom}</td>
                <td className="px-6 py-4 font-semibold text-[#2D6A4F]">{p.tarif} €</td>
                <td className="px-6 py-4 text-gray-500">{p.duree} min</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium
                    ${p.statut === 'actif' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
                    {p.statut === 'actif' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {p.statut}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">Voir</button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {prestationsFiltrees.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucune prestation trouvée</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Nouvelle prestation</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input required type="text" value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarif (€) *</label>
                  <input required type="number" min="0" step="0.01" value={form.tarif}
                    onChange={e => setForm({ ...form, tarif: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée (min)</label>
                  <input type="number" min="0" value={form.duree}
                    onChange={e => setForm({ ...form, duree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacité max</label>
                  <input type="number" min="0" value={form.capacite_max}
                    onChange={e => setForm({ ...form, capacite_max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
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
