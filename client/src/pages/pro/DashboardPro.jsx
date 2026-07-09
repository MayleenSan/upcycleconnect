import { Package, Archive, CreditCard, TrendingUp, Leaf } from 'lucide-react'

export default function DashboardPro() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Tableau de bord</h2>
        <p className="text-gray-500 text-sm mt-1">Bienvenue dans votre espace professionnel</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Annonces consultées', val: 48, icone: Package, bg: 'bg-[#2D6A4F]' },
          { label: 'Objets récupérés', val: 12, icone: Archive, bg: 'bg-[#74C69D]' },
          { label: 'Projets en cours', val: 5, icone: TrendingUp, bg: 'bg-[#2D6A4F]' },
          { label: 'Abonnement', val: 'Premium', icone: CreditCard, bg: 'bg-[#74C69D]' },
        ].map(s => {
          const Icone = s.icone
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
              <div className={`${s.bg} p-3 rounded-lg`}>
                <Icone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#2D2D2D]">{s.val}</p>
                <p className="text-xs text-gray-400 leading-tight">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#2D2D2D] mb-4">Dernières annonces consultées</h3>
          {[
            { titre: 'Lot de tissus colorés', lieu: 'Montreuil', type: 'Don' },
            { titre: 'Palette bois 120x80', lieu: 'Ivry', type: 'Don' },
            { titre: 'Cadres photo dorés x5', lieu: 'Paris 13ème', type: 'Vente' },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#2D2D2D]">{a.titre}</p>
                <p className="text-xs text-gray-400">{a.lieu}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${a.type === 'Don' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                {a.type}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#2D2D2D] mb-4">Projets d'upcycling</h3>
          {[
            { nom: 'Table basse palettes', avancement: 80 },
            { nom: 'Sacs en jean recyclé', avancement: 45 },
            { nom: 'Luminaires tuyaux PVC', avancement: 20 },
          ].map((p, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#2D2D2D] font-medium">{p.nom}</span>
                <span className="text-gray-400">{p.avancement}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-[#2D6A4F] h-1.5 rounded-full" style={{ width: `${p.avancement}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4">
        <Leaf size={22} className="text-white shrink-0" />
        <p className="text-white text-sm font-medium italic">
          Votre activité a permis d'éviter 34 kg de CO₂ ce mois-ci. Continuez !
        </p>
      </div>
    </div>
  )
}