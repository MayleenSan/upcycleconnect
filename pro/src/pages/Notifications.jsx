import { useState } from 'react'
import { Bell, Package, Calendar, Star, CheckCheck, Trash2 } from 'lucide-react'

const baseNotifs = [
  { id: 1, type: 'stock', titre: 'Nouvel objet disponible', message: "Un lot de palettes vient d'être déposé à Ivry-sur-Seine.", date: 'Il y a 5 min', lu: false },
  { id: 2, type: 'alerte', titre: 'Alerte prioritaire déclenchée', message: 'Correspondance avec vos critères : tissus laine, Paris 16ème.', date: 'Il y a 30 min', lu: false },
  { id: 3, type: 'evenement', titre: 'Rappel : Repair Café demain', message: "L'atelier Repair Café du printemps a lieu demain à 14h, Paris 11e.", date: 'Il y a 2h', lu: true },
  { id: 4, type: 'stock', titre: 'Cadres dorés vintage ajoutés', message: 'Lot de 5 cadres disponibles en Paris 13ème.', date: 'Il y a 3h', lu: true },
  { id: 5, type: 'alerte', titre: 'Abonnement : 18 jours restants', message: 'Pensez à renouveler votre abonnement premium pour continuer à recevoir les alertes.', date: 'Hier', lu: true },
]

const getIcon = (type) => {
  if (type === 'stock') return <Package size={16} className="text-[#2D6A4F]" />
  if (type === 'alerte') return <Star size={16} className="text-orange-500" />
  return <Calendar size={16} className="text-blue-500" />
}

export default function Notifications() {
  const [notifs, setNotifs] = useState(baseNotifs)

  const unreadCount = notifs.filter(n => !n.lu).length

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, lu: true })))
  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, lu: true } : n))
  const remove = (id) => setNotifs(prev => prev.filter(n => n.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Notifications</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-[#2D6A4F] font-medium hover:underline"
          >
            <CheckCheck size={15} />
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {notifs.map(n => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`bg-white rounded-xl border p-5 flex items-start gap-4 cursor-pointer transition-colors hover:shadow-sm ${
              n.lu ? 'border-gray-100' : 'border-[#74C69D] bg-green-50/30'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${n.lu ? 'bg-[#F8F4EE]' : 'bg-white'}`}>
              {getIcon(n.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm font-medium ${n.lu ? 'text-[#2D2D2D]' : 'text-[#2D6A4F]'}`}>
                  {n.titre}
                </p>
                {!n.lu && <span className="w-2 h-2 bg-[#2D6A4F] rounded-full shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.message}</p>
              <p className="text-xs text-gray-400 mt-2">{n.date}</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); remove(n.id) }}
              className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {notifs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Bell size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucune notification</p>
          </div>
        )}
      </div>
    </div>
  )
}