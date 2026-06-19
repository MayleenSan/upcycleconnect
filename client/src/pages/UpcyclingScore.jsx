import { Leaf, Recycle, Droplets, Zap } from 'lucide-react'

const stats = [
  { label: 'Objets upcyclés', valeur: 12, icone: Recycle, couleur: 'bg-[#2D6A4F]' },
  { label: 'CO₂ évité (kg)', valeur: 34, icone: Leaf, couleur: 'bg-[#74C69D]' },
  { label: 'Eau économisée (L)', valeur: 210, icone: Droplets, couleur: 'bg-[#2D6A4F]' },
  { label: 'Énergie économisée (kWh)', valeur: 87, icone: Zap, couleur: 'bg-[#74C69D]' },
]

const historique = [
  { mois: 'Janvier', score: 42 },
  { mois: 'Février', score: 55 },
  { mois: 'Mars', score: 61 },
  { mois: 'Avril', score: 78 },
]

const score = 78

export default function UpcyclingScore() {

  const getLabel = (s) => {
    if (s >= 80) return 'Excellent'
    if (s >= 60) return 'Bien'
    if (s >= 40) return 'En progrès'
    return 'Débutant'
  }

  const getCouleur = (s) => {
    if (s >= 80) return 'text-green-500'
    if (s >= 60) return 'text-[#2D6A4F]'
    if (s >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div>

      {/* header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon Upcycling Score</h2>
        <p className="text-gray-500 text-sm mt-0.5">Ton impact environnemental en un coup d'oeil</p>
      </div>

      {/* score principal */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center mb-6">
        <div className="relative flex items-center justify-center w-40 h-40 mb-4">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#F8F4EE" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="#2D6A4F" strokeWidth="10"
              strokeDasharray={`${score * 2.51} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-[#2D6A4F]">{score}</span>
            <span className="text-xs text-gray-400">/ 100</span>
          </div>
        </div>
        <span className={`text-lg font-bold ${getCouleur(score)}`}>{getLabel(score)}</span>
        <p className="text-gray-400 text-sm mt-1 text-center">
          Tu fais partie des meilleurs contributeurs ce mois-ci !
        </p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map(stat => {
          const Icone = stat.icone
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
              <div className={`${stat.couleur} p-3 rounded-lg`}>
                <Icone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#2D2D2D]">{stat.valeur}</p>
                <p className="text-xs text-gray-400 leading-tight">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* historique */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-[#2D2D2D] mb-4">Évolution du score</h3>
        <div className="flex items-end gap-3 h-28">
          {historique.map((h) => (
            <div key={h.mois} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-gray-400">{h.score}</span>
              <div
                className="w-full bg-[#2D6A4F] rounded-t-md transition-all"
                style={{ height: `${(h.score / 100) * 90}px` }}
              />
              <span className="text-xs text-gray-400">{h.mois.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}