import { useState, useEffect } from 'react'
import { Users, Wrench, CalendarDays, Recycle, TrendingUp, Leaf, Clock, Megaphone } from 'lucide-react'
import { getUsers, getPrestations, getEvenements, getAnnonces } from '../services/api'

const citations = [
  "Un objet réparé, c'est une petite victoire contre le gaspillage.",
  "L'upcycling, c'est donner une seconde vie à ce que d'autres ont abandonné.",
  "Chaque geste compte. Chaque objet sauvé fait la différence.",
  "Réparer plutôt que jeter : c'est ça, l'esprit d'UpcycleConnect.",
  "Le meilleur déchet, c'est celui qu'on ne produit pas.",
]

function getSalutation() {
  const heure = new Date().getHours()
  if (heure >= 5 && heure < 12) return "Bonjour"
  if (heure >= 12 && heure < 18) return "Bon après-midi"
  if (heure >= 18 && heure < 22) return "Bonsoir"
  return "Bonne nuit"
}

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [prestations, setPrestations] = useState([])
  const [evenements, setEvenements] = useState([])
  const [annonces, setAnnonces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getUsers().catch(() => []),
      getPrestations().catch(() => []),
      getEvenements().catch(() => []),
      getAnnonces().catch(() => []),
    ]).then(([u, p, e, a]) => {
      setUsers(u || [])
      setPrestations(p || [])
      setEvenements(e || [])
      setAnnonces(a || [])
      setLoading(false)
    })
  }, [])

  const mail = sessionStorage.getItem('mail') || ''
  const moi = users.find(u => u.mail === mail)
  const prenom = moi ? moi.first_name : 'Admin'

  const usersVerifies = users.filter(u => u.verified).length
  const prestaActives = prestations.filter(p => p.statut === 'actif').length
  const eventsOuverts = evenements.filter(e => e.statut === 'ouvert').length
  const annoncesValidees = annonces.filter(a => a.statut === 'valide').length

  const positifs = usersVerifies + prestaActives + eventsOuverts + annoncesValidees
  const total = users.length + prestations.length + evenements.length + annonces.length
  const score = total > 0 ? Math.round((positifs / total) * 100) : 0

  const stats = [
    { label: "Utilisateurs", valeur: users.length, icone: Users, couleur: "bg-[#2D6A4F]" },
    { label: "Annonces", valeur: annonces.length, icone: Megaphone, couleur: "bg-[#74C69D]" },
    { label: "Prestations", valeur: prestations.length, icone: Wrench, couleur: "bg-[#2D6A4F]" },
    { label: "Événements", valeur: evenements.length, icone: CalendarDays, couleur: "bg-[#74C69D]" },
  ]

  const prochainEvenement = evenements.find(e => e.statut === 'ouvert')
  const citation = citations[Math.floor(Math.random() * citations.length)]
  const salutation = getSalutation()

  const pct = (n, d) => (d > 0 ? Math.round((n / d) * 100) : 0)

  if (loading) return <p className="text-gray-500 text-sm">Chargement du tableau de bord...</p>

  return (
    <div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">{salutation}, {prenom}</h2>
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
              <circle cx="50" cy="50" r="40" fill="none" stroke="#2D6A4F" strokeWidth="10"
                strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <span className="absolute text-2xl font-bold text-[#2D6A4F]">{score}%</span>
          </div>
          <p className="text-xs text-gray-400 text-center">Part des éléments actifs/validés sur l'ensemble de la plateforme</p>
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
                {prochainEvenement.lieu || '—'}
                {prochainEvenement.date_debut && ' — ' + new Date(prochainEvenement.date_debut).toLocaleDateString('fr-FR')}
              </p>
              {prochainEvenement.capacite_max ? (
                <p className="text-xs text-gray-400 mt-2">{prochainEvenement.capacite_max} places max</p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aucun événement ouvert</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Recycle size={18} className="text-[#2D6A4F]" />
            <h3 className="font-semibold text-[#2D2D2D]">Activité</h3>
          </div>
          <div className="flex flex-col gap-3">
            <Ligne label="Annonces validées" n={annoncesValidees} d={annonces.length} pct={pct} />
            <Ligne label="Prestations actives" n={prestaActives} d={prestations.length} pct={pct} />
            <Ligne label="Utilisateurs vérifiés" n={usersVerifies} d={users.length} pct={pct} />
            <Ligne label="Événements ouverts" n={eventsOuverts} d={evenements.length} pct={pct} />
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

function Ligne({ label, n, d, pct }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-[#2D6A4F]">{n} / {d}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
        <div className="bg-[#74C69D] h-1.5 rounded-full" style={{ width: `${pct(n, d)}%` }} />
      </div>
    </div>
  )
}
