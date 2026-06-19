import { useState } from 'react'
import { Plus, X, BookOpen, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react'

const baseFormations = [
  { id: 1, titre: "Initiation à l'upcycling textile", description: 'Apprendre à transformer de vieux vêtements en créations uniques.', duree: 3, lieu: 'Paris 11ème', places: 15, prix: 45, statut: 'Validé', date: '2026-05-22' },
  { id: 2, titre: 'Mobilier DIY à partir de palettes', description: 'Créer des meubles écologiques avec des palettes récupérées.', duree: 6, lieu: 'Montreuil', places: 10, prix: 80, statut: 'En attente', date: '2026-06-05' },
  { id: 3, titre: 'Bijoux en matières recyclées', description: 'Fabriquer des bijoux originaux à partir de capsules, fils, chutes de métal.', duree: 2, lieu: 'Paris 13ème', places: 12, prix: 35, statut: 'Validé', date: '2026-06-15' },
  { id: 4, titre: 'Initiation à la réparation électronique', description: 'Diagnostiquer et réparer des appareils électroniques du quotidien.', duree: 4, lieu: 'Paris 10ème', places: 8, prix: 60, statut: 'Refusé', date: '2026-06-20' },
]

const statusOptions = ['Tous', 'Validé', 'En attente', 'Refusé']

const emptyForm = { titre: '', description: '', duree: '', lieu: '', places: '', prix: '', date: '' }

const formFields = [
  ['date', 'Date', 'date'],
  ['lieu', 'Lieu', 'text'],
  ['duree', 'Durée (heures)', 'number'],
  ['places', 'Nombre de places', 'number'],
  ['prix', 'Prix (€/pers)', 'number'],
]

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const statusStyle = (s) => {
  if (s === 'Validé') return 'bg-green-50 text-green-600'
  if (s === 'Refusé') return 'bg-red-50 text-red-500'
  return 'bg-orange-50 text-orange-500'
}

const StatusIcon = ({ statut }) => {
  if (statut === 'Validé') return <CheckCircle size={13} />
  if (statut === 'Refusé') return <X size={13} />
  return <AlertCircle size={13} />
}

export default function Formations() {
  const [formations, setFormations] = useState(baseFormations)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const displayed = formations.filter(f => activeFilter === 'Tous' || f.statut === activeFilter)

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleAdd = () => {
    if (!form.titre || !form.date || !form.lieu) return
    setFormations(prev => [...prev, {
      id: Date.now(),
      ...form,
      duree: Number(form.duree),
      places: Number(form.places),
      prix: Number(form.prix),
      statut: 'En attente',
    }])
    closeModal()
  }

  const handleDelete = (id) => {
    setFormations(prev => prev.filter(f => f.id !== id))
    closeModal()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Mes formations</h2>
          <p className="text-gray-500 text-sm mt-0.5">Créez et gérez vos sessions de formation</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setModal('ajouter') }}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Nouvelle formation
        </button>
      </div>

      <div className="bg-[#F8F4EE] border border-[#74C69D]/40 rounded-xl p-4 text-sm text-[#2D6A4F] mb-5 flex items-start gap-2">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        Toute nouvelle formation doit être validée par un responsable avant d'être publiée sur la plateforme.
      </div>

      <div className="flex gap-2 mb-6">
        {statusOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === opt
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayed.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-[#F8F4EE] p-2 rounded-lg">
                <BookOpen size={16} className="text-[#2D6A4F]" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle(f.statut)}`}>
                <StatusIcon statut={f.statut} />
                {f.statut}
              </span>
            </div>
            <h3 className="font-semibold text-[#2D2D2D] mb-2">{f.titre}</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">{f.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><Clock size={12} className="text-[#2D6A4F]" />{f.duree}h</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin size={12} className="text-[#2D6A4F]" />{f.lieu}</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><Users size={12} className="text-[#2D6A4F]" />{f.places} places</div>
              <div className="text-xs font-semibold text-[#2D6A4F]">{f.prix} €/pers</div>
            </div>
            <p className="text-xs text-gray-400 mb-4">{formatDate(f.date)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setSelected(f); setModal('voir') }}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Voir
              </button>
              {f.statut !== 'Validé' && (
                <button
                  onClick={() => handleDelete(f.id)}
                  className="px-3 py-2 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-colors text-sm"
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">Aucune formation dans cette catégorie.</div>
      )}

      {modal === 'voir' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#F8F4EE] p-3 rounded-lg">
                <BookOpen size={20} className="text-[#2D6A4F]" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D2D2D]">{selected.titre}</h3>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit mt-0.5 ${statusStyle(selected.statut)}`}>
                  <StatusIcon statut={selected.statut} />
                  {selected.statut}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              {[
                ['Date', formatDate(selected.date)],
                ['Lieu', selected.lieu],
                ['Durée', `${selected.duree}h`],
                ['Places', selected.places],
                ['Prix', `${selected.prix} €`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between bg-[#F8F4EE] rounded-lg px-3 py-2">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-[#2D2D2D]">{val}</span>
                </div>
              ))}
            </div>
            {selected.statut === 'En attente' && (
              <p className="text-xs text-orange-500 bg-orange-50 rounded-lg px-3 py-2 mb-4">
                ⏳ En attente de validation par un responsable.
              </p>
            )}
            <button
              onClick={closeModal}
              className="w-full py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {modal === 'ajouter' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-1">Nouvelle formation</h3>
            <p className="text-xs text-gray-400 mb-5">Elle sera soumise à la validation d'un responsable.</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Titre</label>
                <input
                  value={form.titre}
                  onChange={e => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {formFields.map(([key, label, type]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                    />
                  </div>
                ))}
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
                Soumettre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}