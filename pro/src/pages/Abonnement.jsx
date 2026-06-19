import { useState } from 'react'
import { Briefcase, CheckCircle, Star, CreditCard, Calendar, TrendingUp, BarChart3 } from 'lucide-react'

const plans = [
  {
    id: 'basic',
    nom: 'Freemium',
    prix: 0,
    periode: 'mois',
    avantages: ['Accès aux annonces de base', 'Consultation des événements', '1 projet suivi'],
    couleur: 'border-gray-200',
  },
  {
    id: 'premium',
    nom: 'Premium',
    prix: 25,
    periode: 'mois',
    avantages: [
      'Alertes prioritaires personnalisées',
      'Tableaux de bord avancés',
      "Analyse d'impact écologique",
      'Statistiques matériaux',
      'Projets illimités',
      'Support prioritaire',
    ],
    couleur: 'border-[#2D6A4F]',
    recommande: true,
  },
]

const factures = [
  { id: 1, date: '01/05/2026', montant: 25, statut: 'Payée', periode: 'Mai 2026' },
  { id: 2, date: '01/04/2026', montant: 25, statut: 'Payée', periode: 'Avril 2026' },
  { id: 3, date: '01/03/2026', montant: 25, statut: 'Payée', periode: 'Mars 2026' },
]

const statCards = [
  { label: 'Alertes reçues ce mois', valeur: 23, icone: TrendingUp },
  { label: 'Matériaux récupérés', valeur: 8, icone: BarChart3 },
  { label: 'Prochaine facture', valeur: '25€', icone: CreditCard },
]

const tableHeaders = ['Période', 'Date', 'Montant', 'Statut']

export default function Abonnement() {
  const [activePlan, setActivePlan] = useState('premium')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChangePlan = (planId) => {
    if (planId === activePlan) return
    setActivePlan(planId)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2500)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon abonnement</h2>
        <p className="text-gray-500 text-sm mt-0.5">Gérez votre plan et votre facturation</p>
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4 mb-6">
        <div className="bg-white/20 p-3 rounded-lg">
          <Briefcase size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold">Plan Premium actif</p>
          <p className="text-white/70 text-sm mt-0.5">Expire le 05/07/2026 · 18 jours restants</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-xl">25 €</p>
          <p className="text-white/70 text-xs">/mois</p>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600 flex items-center gap-2">
          <CheckCircle size={16} />
          Plan mis à jour avec succès !
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl border-2 p-6 relative ${plan.couleur} ${
              activePlan === plan.id ? 'ring-2 ring-[#74C69D] ring-offset-2' : ''
            }`}
          >
            {plan.recommande && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2D6A4F] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={11} />
                Recommandé
              </div>
            )}
            <div className="mb-4">
              <h3 className="font-bold text-[#2D2D2D] text-lg">{plan.nom}</h3>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-3xl font-bold text-[#2D6A4F]">
                  {plan.prix === 0 ? 'Gratuit' : `${plan.prix}€`}
                </span>
                {plan.prix > 0 && <span className="text-gray-400 text-sm mb-1">/{plan.periode}</span>}
              </div>
            </div>
            <ul className="flex flex-col gap-2 mb-5">
              {plan.avantages.map((a, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-[#2D6A4F] shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleChangePlan(plan.id)}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePlan === plan.id
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : 'bg-[#2D6A4F] text-white hover:bg-[#245a42]'
              }`}
            >
              {activePlan === plan.id ? 'Plan actuel' : 'Choisir ce plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statCards.map(s => {
          const Icone = s.icone
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="bg-[#F8F4EE] p-3 rounded-lg">
                <Icone size={18} className="text-[#2D6A4F]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#2D2D2D]">{s.valeur}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Calendar size={16} className="text-[#2D6A4F]" />
          <h3 className="font-semibold text-[#2D2D2D]">Historique de facturation</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8F4EE] border-b border-gray-100">
              {tableHeaders.map(h => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-[#2D2D2D] text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {factures.map(f => (
              <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3 font-medium text-[#2D2D2D]">{f.periode}</td>
                <td className="px-5 py-3 text-gray-500">{f.date}</td>
                <td className="px-5 py-3 font-semibold text-[#2D6A4F]">{f.montant} €</td>
                <td className="px-5 py-3">
                  <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {f.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}