import { Users, Wrench, Tag, CalendarDays, TrendingUp, Recycle } from 'lucide-react'
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

export default function Dashboard() {
  const prochainEvenement = evenements.find(e => e.statut === "Ouvert")
  const prestationsDisponibles = prestations.filter(p => p.statut === "Disponible").length

  return (
    <div>
      {/* Intro */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Bonjour, Camille 👋</h2>
        <p className="text-gray-500 mt-1 text-sm">Voici un aperçu de l'activité UpcycleConnect</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icone = stat.icone
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
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

      {/* Infos rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Prochain événement */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={18} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D]">Prochain événement</h3>
          </div>
          {prochainEvenement ? (
            <div>
              <p className="font-medium text-[#2D2D2D]">{prochainEvenement.nom}</p>
              <p className="text-sm text-gray-500 mt-1">{prochainEvenement.lieu} — {new Date(prochainEvenement.date).toLocaleDateString('fr-FR')}</p>
              <span className="inline-block mt-3 text-xs bg-[#F8F4EE] text-[#2D6A4F] font-medium px-3 py-1 rounded-full">
                {prochainEvenement.placesRestantes} places restantes
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aucun événement à venir</p>
          )}
        </div>

        {/* Activité */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Recycle size={18} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D]">Activité récente</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Prestations disponibles</span>
              <span className="font-semibold text-[#2D6A4F]">{prestationsDisponibles} / {prestations.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Utilisateurs actifs</span>
              <span className="font-semibold text-[#2D6A4F]">{users.filter(u => u.statut === "Actif").length} / {users.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Événements ouverts</span>
              <span className="font-semibold text-[#2D6A4F]">{evenements.filter(e => e.statut === "Ouvert").length} / {evenements.length}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}