import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMesAnnonces, createMonAnnonce } from '../services/api'
import { Plus, X, LogOut, Megaphone, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function Espace() {
  const [annonces, setAnnonces] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ titre: '', description: '', prix: '', etat: 'bon' })
  const navigate = useNavigate()
  const mail = sessionStorage.getItem('mail') || 'mon compte'

  const charger = () => {
    getMesAnnonces()
      .then(d => { setAnnonces(d || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { charger() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createMonAnnonce({ ...form, prix: parseFloat(form.prix) || 0 })
      setShowModal(false)
      setForm({ titre: '', description: '', prix: '', etat: 'bon' })
      charger()
    } catch (err) {
      alert('Erreur : ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const deconnexion = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('mail')
    navigate('/login')
  }

  const badge = (statut) => {
    if (statut === 'valide') return <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"><CheckCircle size={12} /> validé</span>
    if (statut === 'refuse') return <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-500"><XCircle size={12} /> refusé</span>
    return <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700"><Clock size={12} /> en attente</span>
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE]">

      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="UpcycleConnect" className="w-9 h-9 object-contain" />
          <span className="font-bold text-[#2D6A4F] text-lg">UpcycleConnect</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{mail}</span>
          <button onClick={deconnexion}
            className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Bonjour 👋</h1>
          <p className="text-gray-500 mt-1">Bienvenue dans ton espace particulier. Gère tes annonces d'objets à donner ou vendre.</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#2D2D2D] flex items-center gap-2">
            <Megaphone size={18} className="text-[#2D6A4F]" /> Mes annonces
          </h2>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
            <Plus size={16} /> Nouvelle annonce
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Chargement...</p>
        ) : annonces.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 text-center py-12 text-gray-400 text-sm">
            Tu n'as pas encore d'annonce. Clique sur "Nouvelle annonce" pour commencer.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {annonces.map(a => (
              <div key={a.id_annonce} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-2">
                  {badge(a.statut)}
                  <span className="font-semibold text-[#2D6A4F]">{a.prix} €</span>
                </div>
                <h3 className="font-semibold text-[#2D2D2D]">{a.titre}</h3>
                <p className="text-sm text-gray-500 mt-1">{a.description || '—'}</p>
                <p className="text-xs text-gray-400 mt-2">État : {a.etat}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Nouvelle annonce</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
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
              <p className="text-xs text-gray-400">Ton annonce sera soumise à la validation d'un administrateur avant publication.</p>
              <div className="flex gap-2 justify-end mt-1">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">Annuler</button>
                <button type="submit" disabled={submitting}
                  className="px-4 py-2 text-sm rounded-lg bg-[#2D6A4F] text-white hover:bg-[#245a42] disabled:opacity-50">
                  {submitting ? 'Création...' : 'Publier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
