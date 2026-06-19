import { useState } from 'react'
import { Search, Plus, MapPin, Calendar, Users, X } from 'lucide-react'

const baseEvenements = [
  { id: 1, nom: "Repair Café du printemps", date: "2026-04-12", lieu: "Paris 11e", type: "Atelier", places: 20, placesRestantes: 7, statut: "Ouvert" },
  { id: 2, nom: "Chine & Customise", date: "2026-04-25", lieu: "Montreuil", type: "Marché", places: 50, placesRestantes: 0, statut: "Complet" },
  { id: 3, nom: "Soirée Upcycling Électro", date: "2026-05-03", lieu: "Paris 20e", type: "Événement", places: 30, placesRestantes: 15, statut: "Ouvert" },
  { id: 4, nom: "Atelier Tote Bag Zéro Déchet", date: "2026-05-17", lieu: "Vincennes", type: "Atelier", places: 15, placesRestantes: 3, statut: "Ouvert" },
  { id: 5, nom: "Braderie Verte de l'Est", date: "2026-06-06", lieu: "Bagnolet", type: "Marché", places: 80, placesRestantes: 42, statut: "Ouvert" },
  { id: 6, nom: "Forum Récup & Innov", date: "2026-06-20", lieu: "Paris 19e", type: "Conférence", places: 100, placesRestantes: 0, statut: "Complet" },
]

const eventTypes = ['Atelier', 'Marché', 'Événement', 'Conférence']
const statusOptions = ['Tous', 'Ouvert', 'Complet']
const emptyForm = { nom: '', date: '', lieu: '', type: 'Atelier', places: '', statut: 'Ouvert' }

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const fillRate = (e) => ((e.places - e.placesRestantes) / e.places) * 100

export default function Evenements() {
  const [evenements, setEvenements] = useState(baseEvenements)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const displayed = evenements.filter(e => {
    const matchSearch =
      e.nom.toLowerCase().includes(search.toLowerCase()) ||
      e.lieu.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === 'Tous' || e.statut === activeFilter
    return matchSearch && matchFilter
  })

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleAdd = () => {
    if (!form.nom || !form.date || !form.lieu || !form.places) return
    const places = Number(form.places)
    setEvenements(prev => [...prev, { id: Date.now(), ...form, places, placesRestantes: places }])
    closeModal()
  }

  const handleEdit = () => {
    if (!form.nom || !form.date || !form.lieu || !form.places) return
    setEvenements(prev => prev.map(e =>
      e.id === selected.id
        ? { ...e, nom: form.nom, date: form.date, lieu: form.lieu, type: form.type, places: Number(form.places), statut: form.statut }
        : e
    ))
    closeModal()
  }

  const handleDelete = () => {
    setEvenements(prev => prev.filter(e => e.id !== selected.id))
    closeModal()
  }

  const textFields = [
    { key: 'nom', label: 'Nom', type: 'text' },
    { key: 'lieu', label: 'Lieu', type: 'text' },
    { key: 'places', label: 'Nombre de places', type: 'number' },
  ]

  const FormModal = ({ titre, onSave }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
        <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">{titre}</h3>
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
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Type</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            >
              {eventTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Statut</label>
            <select
              value={form.statut}
              onChange={e => setForm({ ...form, statut: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
            >
              <option>Ouvert</option>
              <option>Complet</option>
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
            onClick={onSave}
            className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Événements</h2>
          <p className="text-gray-500 text-sm mt-1">{evenements.length} événements enregistrés</p>
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
            placeholder="Rechercher un événement..."
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map(e => (
          <div key={e.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">{e.type}</span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                e.statut === 'Ouvert' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'
              }`}>
                {e.statut}
              </span>
            </div>
            <h3 className="font-semibold text-[#2D2D2D] mb-3">{e.nom}</h3>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} className="text-[#2D6A4F]" />
                {formatDate(e.date)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-[#2D6A4F]" />
                {e.lieu}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users size={14} className="text-[#2D6A4F]" />
                {e.placesRestantes} / {e.places} places restantes
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
              <div
                className="bg-[#2D6A4F] h-1.5 rounded-full transition-all"
                style={{ width: `${fillRate(e)}%` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setSelected(e); setModal('voir') }}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors"
              >
                Voir
              </button>
              <button
                onClick={() => {
                  setSelected(e)
                  setForm({ nom: e.nom, date: e.date, lieu: e.lieu, type: e.type, places: String(e.places), statut: e.statut })
                  setModal('modifier')
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={() => { setSelected(e); setModal('supprimer') }}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">Aucun événement trouvé</div>
      )}

      {modal === 'voir' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <span className="text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
              {selected.type}
            </span>
            <h3 className="text-xl font-bold text-[#2D2D2D] mt-3 mb-4">{selected.nom}</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#2D6A4F]" />
                {formatDate(selected.date)}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#2D6A4F]" />
                {selected.lieu}
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#2D6A4F]" />
                {selected.placesRestantes} / {selected.places} places restantes
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
              <div
                className="bg-[#2D6A4F] h-1.5 rounded-full"
                style={{ width: `${fillRate(selected)}%` }}
              />
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

      {modal === 'ajouter' && <FormModal titre="Nouvel événement" onSave={handleAdd} />}
      {modal === 'modifier' && selected && <FormModal titre="Modifier l'événement" onSave={handleEdit} />}

      {modal === 'supprimer' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Supprimer l'événement ?</h3>
            <p className="text-gray-500 text-sm mb-6">
              <strong>{selected.nom}</strong> sera définitivement supprimé.
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