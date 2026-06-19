import { useNavigate } from 'react-router-dom'
import { BookOpen, Calendar, Lightbulb, MessageSquare, Clock, CheckCircle } from 'lucide-react'

const stats = [
  { label: 'Formations créées', valeur: 4, icon: BookOpen, couleur: 'bg-[#2D6A4F]' },
  { label: 'Événements à venir', valeur: 2, icon: Calendar, couleur: 'bg-[#74C69D]' },
  { label: 'Conseils publiés', valeur: 12, icon: Lightbulb, couleur: 'bg-[#2D6A4F]' },
  { label: 'Posts à modérer', valeur: 3, icon: MessageSquare, couleur: 'bg-orange-400' },
]

const sessions = [
  { id: 1, titre: 'Atelier Tote Bag Zéro Déchet', date: '17/05/2026', heure: '14h00', lieu: 'Paris 11ème', statut: 'Validé' },
  { id: 2, titre: 'Formation Upcycling Bois', date: '22/05/2026', heure: '10h00', lieu: 'Montreuil', statut: 'En attente' },
]

const forums = [
  { titre: 'Techniques de ponçage sur métal récupéré', posts: 8, signalements: 1 },
  { titre: 'Où trouver des palettes gratuites à Paris ?', posts: 23, signalements: 2 },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Tableau de bord</h2>
        <p className="text-gray-500 text-sm mt-0.5">Bonjour, Camille 👋</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, valeur, icon: Icon, couleur }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
            <div className={`${couleur} p-3 rounded-lg`}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#2D2D2D]">{valeur}</p>
              <p className="text-xs text-gray-400 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#2D2D2D] flex items-center gap-2">
              <Calendar size={16} className="text-[#2D6A4F]" />
              Prochaines sessions
            </h3>
            <button onClick={() => navigate('/planning')} className="text-xs text-[#2D6A4F] hover:underline">
              Voir planning
            </button>
          </div>
          {sessions.map(s => (
            <div key={s.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <div className={`p-2 rounded-lg ${s.statut === 'Validé' ? 'bg-green-50' : 'bg-orange-50'}`}>
                {s.statut === 'Validé'
                  ? <CheckCircle size={16} className="text-green-500" />
                  : <Clock size={16} className="text-orange-400" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2D2D]">{s.titre}</p>
                <p className="text-xs text-gray-400">{s.date} à {s.heure} · {s.lieu}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                s.statut === 'Validé' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
              }`}>
                {s.statut}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#2D2D2D] flex items-center gap-2 mb-4">
            <MessageSquare size={16} className="text-[#2D6A4F]" />
            Forums à modérer
          </h3>
          {forums.map((f, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#2D2D2D] leading-tight">{f.titre}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.posts} messages</p>
              </div>
              {f.signalements > 0 && (
                <span className="ml-3 text-xs bg-red-50 text-red-500 font-medium px-2 py-1 rounded-full shrink-0">
                  {f.signalements} signalement{f.signalements > 1 ? 's' : ''}
                </span>
              )}
            </div>
          ))}
          <button
            onClick={() => navigate('/forums')}
            className="mt-3 w-full py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Accéder aux forums
          </button>
        </div>
      </div>
    </div>
  )
}