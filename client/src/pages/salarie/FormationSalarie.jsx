import { useState } from 'react'
import { Plus, CheckCircle, Clock, XCircle } from 'lucide-react'

const formations = [
  { id: 1, titre: 'Initiation à l\'upcycling textile', date: '02/05/2026', heure: '14h00', lieu: 'Paris 10ème', places: 8, inscrits: 6, statut: 'Validée' },
  { id: 2, titre: 'Fabriquer un meuble avec des palettes', date: '10/05/2026', heure: '09h30', lieu: 'Montreuil', places: 6, inscrits: 4, statut: 'Validée' },
  { id: 3, titre: 'Upcycling IoT avancé', date: '28/05/2026', heure: '10h00', lieu: 'Paris 11ème', places: 15, inscrits: 0, statut: 'En attente' },
  { id: 4, titre: 'Séance découverte débutants', date: '03/06/2026', heure: '14h00', lieu: 'Bourg-la-Reine', places: 12, inscrits: 0, statut: 'En attente' },
]

const iconeStatut = (s) => {
  if (s === 'Validée') return <CheckCircle size={14} className="text-green-500" />
  if (s === 'En attente') return <Clock size={14} className="text-yellow-500" />
  return <XCircle size={14} className="text-red-400" />
}

const bgStatut = (s) => {
  if (s === 'Validée') return 'bg-green-50 text-green-600'
  if (s === 'En attente') return 'bg-yellow-50 text-yellow-600'
  return 'bg-red-50 text-red-500'
}

export default function FormationsSalarie() {
  const [afficherForm, setAfficherForm] = useState(false)
  const [form, setForm] = useState({ titre: '', date: '', heure: '', lieu: '', places: '' })
  const [succes, setSucces] = useState(false)

  const handleSubmit = () => {
    if (!form.titre || !form.date || !form.lieu) return
    setSucces(true)
    setAfficherForm(false)
    setForm({ titre: '', date: '', heure: '', lieu: '', places: '' })
    setTimeout(() => setSucces(false), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Mes formations</h2>
          <p className="text-gray-500 text-sm mt-0.5">Créer et gérer vos sessions de formation</p>
        </div>
        <button onClick={() => setAfficherForm(true)}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
          <Plus size={16} />Nouvelle formation
        </button>
      </div>

      {succes && (
        <div className="mb-4 px-4 py-2.5 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600">
          Formation soumise, en attente de validation par votre responsable.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {formations.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-[#2D2D2D]">{f.titre}</h3>
              <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${bgStatut(f.statut)}`}>
                {iconeStatut(f.statut)}{f.statut}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-500">
              <span>📅 {f.date} à {f.heure}</span>
              <span>📍 {f.lieu}</span>
              <span>👥 {f.inscrits}/{f.places} inscrits</span>
              <div className="w-full bg-gray-100 rounded-full h-1.5 self-center">
                <div className="bg-[#2D6A4F] h-1.5 rounded-full" style={{ width: `${(f.inscrits / f.places) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {afficherForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">Nouvelle formation</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Titre</label>
                <input value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })}
                  placeholder="Ex: Atelier upcycling textile"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Heure</label>
                  <input type="time" value={form.heure} onChange={e => setForm({ ...form, heure: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Lieu</label>
                <input value={form.lieu} onChange={e => setForm({ ...form, lieu: e.target.value })}
                  placeholder="Ex: Paris 10ème"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Nombre de places</label>
                <input type="number" value={form.places} onChange={e => setForm({ ...form, places: e.target.value })}
                  placeholder="Ex: 12"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setAfficherForm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42]">
                Soumettre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}