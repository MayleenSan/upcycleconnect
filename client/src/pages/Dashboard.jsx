import { useState } from 'react'
import { Users, Wrench, Tag, CalendarDays, Recycle, TrendingUp, Leaf, Clock } from 'lucide-react'
import { users } from '../data/users'
import { prestations } from '../data/prestations'
import { categories } from '../data/categories'
import { evenements } from '../data/evenements'

const stats = [
  { label: "Utilisateurs", valeur: users.length, icone: Users, couleur: "bg-[#2D6A4F]" },
  { label: "Prestations", valeur: prestations.length, icone: Wrench, couleur: "bg-[#74C69D]" },
  { label: "Catégories", valeur: categories.length, icone: Tag, couleur: "bg-[#2D6A4F]" },
  { label: "Événements", valeur: evenements.length, icone: CalendarDays, couleur: "bg-[#74C69D]" },
]

const citations = [
  "Un objet réparé, c'est une petite victoire contre le gaspillage. ",
  "L'upcycling, c'est donner une seconde vie à ce que d'autres ont abandonné. ",
  "Chaque geste compte. Chaque objet sauvé fait la différence. ",
  "Réparer plutôt que jeter c'est ça, l'esprit d'UpcycleConnect. ",
  "Le meilleur déchet, c'est celui qu'on ne produit pas. ",
]

function getSalutation() {
  const heure = new Date().getHours()
  if (heure >= 5 && heure < 12) return "Bonjour"
  if (heure >= 12 && heure < 18) return "Bon après-midi"
  if (heure >= 18 && heure < 22) return "Bonsoir"
  return "Bonne nuit"
}

function getUpcyclingScore() {
  const actifs = users.filter(u => u.statut === "Actif").length
  const dispo = prestations.filter(p => p.statut === "Disponible").length
  const ouverts = evenements.filter(e => e.statut === "Ouvert").length
  const total = users.length + prestations.length + evenements.length
  return Math.round(((actifs + dispo + ouverts) / total) * 100)
}

export default function Dashboard() {
  const [citation] = useState(() => citations[Math.floor(Math.random() * citations.length)])

  const prochainEvenement = evenements.find(e => e.statut === "Ouvert")
  const prestationsDisponibles = prestations.filter(p => p.statut === "Disponible").length
  const score = getUpcyclingScore()
  const salutation = getSalutation()

  return (
    <div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">
            {salutation}, Mayleen
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Voici un aperçu de l'activité UpcycleConnect aujourd'hui
          </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 self-start">
            <TrendingUp size={18} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D]">Upcycling Score</h3>
          </div>
          <div className="relative flex items-center justify-center w-28 h-28 mb-3">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F8F4EE" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#2D6A4F" strokeWidth="10"
                strokeDasharray={`${score * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-2xl font-bold text-[#2D6A4F]">{score}%</span>
          </div>
          <p className="text-xs text-gray-400 text-center">Score basé sur l'activité globale de la plateforme</p>
        </div>

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
              <span className="text-gray-500">Utilisateurs actifs</span>
              <span className="font-semibold text-[#2D6A4F]">{users.filter(u => u.statut === "Actif").length} / {users.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#74C69D] h-1.5 rounded-full" style={{ width: `${(users.filter(u => u.statut === "Actif").length / users.length) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-500">Événements ouverts</span>
              <span className="font-semibold text-[#2D6A4F]">{evenements.filter(e => e.statut === "Ouvert").length} / {evenements.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#74C69D] h-1.5 rounded-full" style={{ width: `${(evenements.filter(e => e.statut === "Ouvert").length / evenements.length) * 100}%` }} />
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