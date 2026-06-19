import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin } from 'lucide-react'

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const typeColors = {
  'Formation': 'bg-[#2D6A4F] text-white',
  'Atelier': 'bg-[#74C69D] text-white',
  'Conférence': 'bg-blue-500 text-white',
  'Réunion': 'bg-orange-400 text-white',
}

const basePlanning = [
  { id: 1, titre: 'Atelier Tote Bag', date: '2026-06-05', heure: '14h00', lieu: 'Paris 11ème', type: 'Atelier', duree: '2h' },
  { id: 2, titre: 'Formation Upcycling Bois', date: '2026-06-12', heure: '10h00', lieu: 'Montreuil', type: 'Formation', duree: '6h' },
  { id: 3, titre: 'Réunion équipe animateurs', date: '2026-06-12', heure: '09h00', lieu: 'Paris 10ème', type: 'Réunion', duree: '1h' },
  { id: 4, titre: 'Conférence Économie Circulaire', date: '2026-06-19', heure: '18h00', lieu: 'Paris 13ème', type: 'Conférence', duree: '2h' },
  { id: 5, titre: 'Atelier Bijoux Recyclés', date: '2026-06-26', heure: '15h00', lieu: 'Paris 13ème', type: 'Atelier', duree: '3h' },
]

const emptyForm = { titre: '', date: '', heure: '', lieu: '', type: 'Atelier', duree: '' }

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDay = (year, month) => {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export default function Planning() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [events, setEvents] = useState(basePlanning)
  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const handleAdd = () => {
    if (!form.titre || !form.date || !form.heure) return
    setEvents(prev => [...prev, { id: Date.now(), ...form }])
    setShowModal(false)
    setForm(emptyForm)
  }

  const removeEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id))

  const nbDays = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)
  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon planning</h2>
          <p className="text-gray-500 text-sm mt-0.5">Gérez vos formations et événements</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-semibold text-[#2D2D2D]">{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: nbDays }).map((_, i) => {
              const day = i + 1
              const dayEvents = getEventsForDay(day)
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              const isSelected = day === selectedDay
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  className={`min-h-[52px] rounded-lg p-1 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#2D6A4F]/10 ring-2 ring-[#2D6A4F]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                    isToday ? 'bg-[#2D6A4F] text-white' : 'text-gray-600'
                  }`}>
                    {day}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map(e => (
                      <div
                        key={e.id}
                        className={`text-[10px] px-1 py-0.5 rounded truncate font-medium ${typeColors[e.type] || 'bg-gray-200 text-gray-600'}`}
                      >
                        {e.titre}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-gray-400">+{dayEvents.length - 2}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {selectedDay ? (
            <>
              <h3 className="font-semibold text-[#2D2D2D] mb-4">{selectedDay} {MONTHS[month]}</h3>
              {selectedEvents.length === 0 ? (
                <p className="text-sm text-gray-400">Aucun événement ce jour.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedEvents.map(e => (
                    <div key={e.id} className="rounded-xl border border-gray-100 p-4 relative">
                      <button
                        onClick={() => removeEvent(e.id)}
                        className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[e.type] || 'bg-gray-100'}`}>
                        {e.type}
                      </span>
                      <p className="font-medium text-[#2D2D2D] text-sm mt-2">{e.titre}</p>
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock size={11} />{e.heure}{e.duree && ` · ${e.duree}`}
                        </div>
                        {e.lieu && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <MapPin size={11} />{e.lieu}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div>
              <h3 className="font-semibold text-[#2D2D2D] mb-4">Prochains événements</h3>
              <div className="flex flex-col gap-3">
                {events.slice(0, 4).map(e => (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      e.type === 'Formation' ? 'bg-[#2D6A4F]' : e.type === 'Atelier' ? 'bg-[#74C69D]' : 'bg-blue-400'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-[#2D2D2D]">{e.titre}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(e.date).toLocaleDateString('fr-FR')} · {e.heure}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">Nouvel événement</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Titre</label>
                <input
                  value={form.titre}
                  onChange={e => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['date', 'Date', 'date'], ['heure', 'Heure', 'time'], ['lieu', 'Lieu', 'text'], ['duree', 'Durée', 'text']].map(([key, label, type]) => (
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
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                >
                  {Object.keys(typeColors).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
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
    </div>
  )
}