import { useState } from 'react'
import { Users, Wrench, Tag, CalendarDays, Recycle, TrendingUp, Leaf, Clock } from 'lucide-react'
import { prestations, categories, evenements } from '../../data/adminMock'
import { useAuth } from '../../context/AuthContext'

const citations = [
  "Un objet réparé, c'est une petite victoire contre le gaspillage.",
  "L'upcycling, c'est donner une seconde vie à ce que d'autres ont abandonné.",
  "Chaque geste compte. Chaque objet sauvé fait la différence.",
  "Réparer plutôt que jeter c'est ça, l'esprit d'UpcycleConnect.",
  "Le meilleur déchet, c'est celui qu'on ne produit pas.",
]

function getSalutation() {
  const heure = new Date().getHours()
  if (heure >= 5 && heure < 12) return "Bonjour"
  if (heure >= 12 && heure < 18) return "Bon après-midi"
  if (heure >= 18 && heure < 22) return "Bonsoir"
  return "Bonne nuit"
}

export default function DashboardAdmin() {
  const { user } = useAuth()
  const prenom = user?.first_name || 'Admin'

  const prestationsDisponibles = prestations.filter(p => p.statut === "Disponible").length
  const evenementsOuverts = evenements.filter(e => e.statut === "Ouvert").length
  const prochainEvenement = evenements.find(e => e.statut === "Ouvert")
  // tirage au sort fait une seule fois au montage, pas à chaque render
  const [citation] = useState(() => citations[Math.floor(Math.random() * citations.length)])
  const salutation = getSalutation()

  const stats = [
    { label: "Prestations", valeur: prestations.length, icone: Wrench, couleur: "bg-[#74C69D]" },
    { label: "Catégories", valeur: categories.length, icone: Tag, couleur: "bg-[#2D6A4F]" },
    { label: "Événements", valeur: evenements.length, icone: CalendarDays, couleur: "bg-[#74C69D]" },
    { label: "Événements ouverts", valeur: evenementsOuverts, icone: Users, couleur: "bg-[#2D6A4F]" },
  ]

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">{salutation}, {prenom}</h2>
          <p className="text-gray-500 mt-1 text-sm">Voici un aperçu de l'activité UpcycleConnect aujourd'hui</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-[#2D6A4F] font-medium">
            <Clock size={13} />
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-[#F8F4EE] rounded-2xl">
          <Leaf size={32} className="text-[#2D6A4F]" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icone = stat.icone
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <div className={`${stat.couleur} p-3 rounded-lg`}>
                <Icone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D2D2D]">{stat.valeur}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={18} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D]">Prochain événement</h3>
          </div>
          {prochainEvenement ? (
            <div>
              <p className="font-medium text-[#2D2D2D]">{prochainEvenement.nom}</p>
              <p className="text-sm text-gray-500 mt-1">
                {prochainEvenement.lieu} — {new Date(prochainEvenement.date).toLocaleDateString('fr-FR')}
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-[#2D6A4F] h-1.5 rounded-full"
                  style={{ width: `${((prochainEvenement.places - prochainEvenement.placesRestantes) / prochainEvenement.places) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">{prochainEvenement.placesRestantes} places restantes</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aucun événement à venir</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Recycle size={18} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D]">Activité</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Prestations disponibles</span>
              <span className="font-semibold text-[#2D6A4F]">{prestationsDisponibles} / {prestations.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#74C69D] h-1.5 rounded-full" style={{ width: `${(prestationsDisponibles / prestations.length) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-500">Événements ouverts</span>
              <span className="font-semibold text-[#2D6A4F]">{evenementsOuverts} / {evenements.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#74C69D] h-1.5 rounded-full" style={{ width: `${(evenementsOuverts / evenements.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4">
        <Leaf size={22} className="text-white shrink-0" />
        <p className="text-white text-sm font-medium italic">{citation}</p>
      </div>
    </div>
  )
}