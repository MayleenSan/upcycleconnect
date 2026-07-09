import { Calendar, Clock, MapPin } from 'lucide-react'

const planning = [
  { semaine: 'Cette semaine', events: [
    { titre: 'Initiation textile', date: 'Vendredi 02/05', heure: '14h00-17h00', lieu: 'Paris 10ème', type: 'Formation' },
  ]},
  { semaine: 'Semaine prochaine', events: [
    { titre: 'Atelier palettes', date: 'Samedi 10/05', heure: '09h30-13h30', lieu: 'Montreuil', type: 'Atelier' },
  ]},
  { semaine: 'Plus tard', events: [
    { titre: 'Marché upcycling', date: 'Jeudi 15/05', heure: '10h00-18h00', lieu: 'Paris 13ème', type: 'Événement' },
    { titre: 'Bijoux recyclés', date: 'Jeudi 22/05', heure: '15h30-17h30', lieu: 'Bourg-la-Reine', type: 'Atelier' },
    { titre: 'Upcycling IoT avancé', date: 'Mercredi 28/05', heure: '10h00-12h00', lieu: 'Paris 11ème', type: 'Formation' },
  ]},
]

const couleurType = (t) => {
  if (t === 'Formation') return 'bg-blue-50 text-blue-500'
  if (t === 'Atelier') return 'bg-purple-50 text-purple-500'
  return 'bg-orange-50 text-orange-500'
}

export default function PlanningSalarie() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon planning</h2>
        <p className="text-gray-500 text-sm mt-0.5">Vos interventions à venir</p>
      </div>

      {planning.map(section => (
        <div key={section.semaine} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={15} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D] text-sm">{section.semaine}</h3>
          </div>
          <div className="flex flex-col gap-3">
            {section.events.map((e, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-[#2D2D2D]">{e.titre}</h4>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${couleurType(e.type)}`}>{e.type}</span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#2D6A4F]" />{e.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#2D6A4F]" />{e.heure}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#2D6A4F]" />{e.lieu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}