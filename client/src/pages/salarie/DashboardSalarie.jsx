import { BookOpen, Calendar, Users, MessageSquare, Leaf } from 'lucide-react'

export default function DashboardSalarie() {
  const heure = new Date().getHours()
  const salut = heure < 12 ? 'Bonjour' : heure < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">{salut} 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Voici un résumé de votre activité de la semaine</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Formations animées', val: 3, icone: BookOpen, bg: 'bg-[#2D6A4F]' },
          { label: 'Participants total', val: 42, icone: Users, bg: 'bg-[#74C69D]' },
          { label: 'Événements prévus', val: 5, icone: Calendar, bg: 'bg-[#2D6A4F]' },
          { label: 'Conseils publiés', val: 8, icone: MessageSquare, bg: 'bg-[#74C69D]' },
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
          <h3 className="font-semibold text-[#2D2D2D] mb-4">Prochaines interventions</h3>
          {[
            { formation: 'Initiation textile', date: '02/05/2026', heure: '14h00', lieu: 'Paris 10ème' },
            { formation: 'Atelier palettes', date: '10/05/2026', heure: '09h30', lieu: 'Montreuil' },
            { formation: 'Bijoux recyclés', date: '22/05/2026', heure: '15h30', lieu: 'Bourg-la-Reine' },
          ].map((e, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#2D2D2D]">{e.formation}</p>
                <p className="text-xs text-gray-400">{e.lieu}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-[#2D6A4F]">{e.date}</p>
                <p className="text-xs text-gray-400">{e.heure}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#2D2D2D] mb-4">Formations en attente de validation</h3>
          {[
            { titre: 'Upcycling IoT avancé', statut: 'En attente', date: '28/05/2026' },
            { titre: 'Séance découverte débutants', statut: 'En attente', date: '03/06/2026' },
          ].map((f, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
              <p className="text-sm font-medium text-[#2D2D2D]">{f.titre}</p>
              <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 font-medium">{f.statut}</span>
            </div>
          ))}
          {[].length === 0 && (
            <p className="text-sm text-gray-400 mt-2">Aucune autre en attente.</p>
          )}
        </div>
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4">
        <Leaf size={22} className="text-white shrink-0" />
        <p className="text-white text-sm font-medium italic">
          Vos formations ont sensibilisé 42 participants à l'upcycling ce mois-ci. Merci !
        </p>
      </div>
    </div>
  )
}