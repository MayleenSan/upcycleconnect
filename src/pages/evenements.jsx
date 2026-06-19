import { useState, useEffect } from 'react'
import { getEvenements, createEvenement } from '../services/api'
import { Search, Plus, MapPin, Calendar, Users, X } from 'lucide-react'

export default function Evenements() {
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    nom: '', description: '', date_debut: '', date_fin: '',
    lieu: '', capacite_max: '', statut: 'ouvert'
  })

  const charger = () => {
    getEvenements()
      .then(data => { setEvenements(data || []); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }

  useEffect(() => { charger() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createEvenement({ ...form, capacite_max: parseInt(form.capacite_max) || 0 })
      setShowModal(false)
      setForm({ nom: '', description: '', date_debut: '', date_fin: '', lieu: '', capacite_max: '', statut: 'ouvert' })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const filtres = ['Tous', 'ouvert', 'complet']

  const evenementsFiltres = evenements.filter(e => {
    const matchRecherche = e.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      (e.lieu || '').toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || e.statut === filtre
    return matchRecherche && matchFiltre
  })

  if (loading) return <p className="text-gray-500 text-sm">Chargement...</p>
  if (error) return <p className="text-red-500 text-sm">Erreur : {error}</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Événements</h2>
          <p className="text-gray-500 text-sm mt-1">{evenements.length} événements enregistrés</p>
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
            placeholder="Rechercher un événement..."
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
                ${filtre === f ? 'bg-[#2D6A4F] text-white' : 'bg-white border border-gray-200 text-[#2D2D2D] hover:bg-[#F8F4EE]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {evenementsFiltres.map(e => (
          <div key={e.id_evenement} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium px-3 py-1 rounded-full
                ${e.statut === 'ouvert' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
                {e.statut || '—'}
              </span>
            </div>
            <h3 className="font-semibold text-[#2D2D2D] mb-3">{e.nom}</h3>
            <div className="flex flex-col gap-2 mb-4">
              {e.date_debut && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} className="text-[#2D6A4F]" />
                  {new Date(e.date_debut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
              {e.lieu && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-[#2D6A4F]" />
                  {e.lieu}
                </div>
              )}
              {e.capacite_max && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={14} className="text-[#2D6A4F]" />
                  {e.capacite_max} places max
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">Modifier</button>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {evenementsFiltres.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">Aucun événement trouvé</div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Nouvel événement</h3>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début *</label>
                  <input required type="datetime-local" value={form.date_debut}
                    onChange={e => setForm({ ...form, date_debut: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin *</label>
                  <input required type="datetime-local" value={form.date_fin}
                    onChange={e => setForm({ ...form, date_fin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                <input type="text" value={form.lieu}
                  onChange={e => setForm({ ...form, lieu: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacité max</label>
                  <input type="number" min="1" value={form.capacite_max}
                    onChange={e => setForm({ ...form, capacite_max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]">
                    <option value="ouvert">Ouvert</option>
                    <option value="complet">Complet</option>
                  </select>
                </div>
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
