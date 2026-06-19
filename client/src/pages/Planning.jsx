import { useState } from 'react'
import { Calendar, Clock, MapPin, X } from 'lucide-react'

const reservations = [
  { id: 1, titre: 'Initiation à l\'upcycling textile', type: 'Formation', date: '02/05/2026', heure: '14h00', lieu: 'Paris 10ème', statut: 'Confirmé' },
  { id: 2, titre: 'Marché de l\'upcycling', type: 'Événement', date: '15/05/2026', heure: '10h00', lieu: 'Paris 13ème', statut: 'Confirmé' },
  { id: 3, titre: 'Bijoux à partir de matériaux recyclés', type: 'Atelier', date: '22/05/2026', heure: '15h30', lieu: 'Bourg-la-Reine', statut: 'En attente' },
]

const couleurType = (type) => {
  if (type === 'Formation') return 'bg-blue-50 text-blue-500'
  if (type === 'Atelier') return 'bg-purple-50 text-purple-500'
  return 'bg-orange-50 text-orange-500'
}

const couleurStatut = (statut) => {
  if (statut === 'Confirmé') return 'bg-green-50 text-green-600'
  return 'bg-yellow-50 text-yellow-500'
}

export default function Planning() {
  const [liste, setListe] = useState(reservations)
  const [aAnnuler, setAAnnuler] = useState(null)

  const annuler = (id) => {
    setListe(liste.filter(r => r.id !== id))
    setAAnnuler(null)
  }

  return (
    <div>

      {/* header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon Planning</h2>
        <p className="text-gray-500 text-sm mt-0.5">Tes réservations et événements à venir</p>
      </div>

      {liste.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          Aucune réservation pour le moment.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {liste.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${couleurType(r.type)}`}>
                    {r.type}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${couleurStatut(r.statut)}`}>
                    {r.statut}
                  </span>
                </div>
                <button
                  onClick={() => setAAnnuler(r.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <h3 className="font-semibold text-[#2D2D2D] mb-3">{r.titre}</h3>

              <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#2D6A4F]" />
                  {r.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[#2D6A4F]" />
                  {r.heure}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#2D6A4F]" />
                  {r.lieu}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal confirmation annulation */}
      {aAnnuler && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Annuler la réservation ?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Cette action est irréversible. Tu devras te réinscrire si tu changes d'avis.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAAnnuler(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Garder
              </button>
              <button
                onClick={() => annuler(aAnnuler)}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}