import { useNavigate } from 'react-router-dom'
import { Package, FolderOpen, Bell, TrendingUp, Leaf, Star } from 'lucide-react'

const stats = [
  { label: 'Annonces consultées', valeur: 47, icone: Package, couleur: 'bg-[#2D6A4F]' },
  { label: 'Projets en cours', valeur: 3, icone: FolderOpen, couleur: 'bg-[#74C69D]' },
  { label: 'Nouvelles alertes', valeur: 5, icone: Bell, couleur: 'bg-[#2D6A4F]' },
  { label: 'Score plateforme', valeur: '82%', icone: TrendingUp, couleur: 'bg-[#74C69D]' },
]

const alertes = [
  { id: 1, titre: 'Palette en bois disponible', lieu: 'Ivry-sur-Seine', categorie: 'Mobilier', temps: 'Il y a 10 min' },
  { id: 2, titre: 'Lot de tissus anciens', lieu: 'Montreuil', categorie: 'Textile', temps: 'Il y a 1h' },
  { id: 3, titre: 'Cadres dorés vintage', lieu: 'Paris 13ème', categorie: 'Décoration', temps: 'Il y a 2h' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Tableau de bord</h2>
        <p className="text-gray-500 text-sm mt-0.5">Bienvenue, Forge & Patine</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => {
          const Icone = s.icone
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
              <div className={`${s.couleur} p-3 rounded-lg`}>
                <Icone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#2D2D2D]">{s.valeur}</p>
                <p className="text-xs text-gray-400 leading-tight">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#2D2D2D] flex items-center gap-2">
            <Star size={16} className="text-[#2D6A4F]" />
            Alertes prioritaires
          </h3>
          <button onClick={() => navigate('/annonces')} className="text-xs text-[#2D6A4F] hover:underline">
            Voir tout
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {alertes.map(a => (
            <div key={a.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#2D2D2D]">{a.titre}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.lieu} · {a.categorie}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0 ml-4">{a.temps}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4">
        <Leaf size={22} className="text-white shrink-0" />
        <p className="text-white text-sm font-medium italic">
          Votre abonnement premium expire dans 18 jours — pensez à renouveler.
        </p>
      </div>
    </div>
  )
}