import { Check, CreditCard, Zap } from 'lucide-react'

const offres = [
  {
    nom: 'Gratuit',
    prix: 0,
    periode: '',
    features: ['Accès aux annonces', 'Profil public', '5 contacts/mois'],
    actuel: false,
  },
  {
    nom: 'Premium',
    prix: 25,
    periode: '/mois',
    features: ['Alertes prioritaires', 'Statistiques avancées', 'Contacts illimités', 'Badge vérifié', 'Mise en avant des projets'],
    actuel: true,
  },
  {
    nom: 'Entreprise',
    prix: 49,
    periode: '/mois',
    features: ['Tout Premium', 'Multi-utilisateurs', 'API accès données', 'Support dédié', 'Publicité sur la plateforme'],
    actuel: false,
  },
]

export default function AbonnementPro() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Mon abonnement</h2>
        <p className="text-gray-500 text-sm mt-0.5">Gérer votre formule et votre facturation</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#2D6A4F] p-2.5 rounded-lg">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-[#2D2D2D]">Formule actuelle : <span className="text-[#2D6A4F]">Premium</span></p>
            <p className="text-sm text-gray-400">Renouvellement le 01/07/2026 · 25€/mois</p>
          </div>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600">Actif</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {offres.map(o => (
          <div key={o.nom} className={`bg-white rounded-xl border p-6 relative ${o.actuel ? 'border-[#2D6A4F] shadow-sm' : 'border-gray-100'}`}>
            {o.actuel && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full bg-[#2D6A4F] text-white">
                Plan actuel
              </span>
            )}
            <h3 className="font-bold text-[#2D2D2D] mb-1">{o.nom}</h3>
            <div className="flex items-baseline gap-0.5 mb-4">
              <span className="text-3xl font-bold text-[#2D6A4F]">{o.prix === 0 ? 'Gratuit' : `${o.prix}€`}</span>
              <span className="text-gray-400 text-sm">{o.periode}</span>
            </div>
            <ul className="flex flex-col gap-2 mb-5">
              {o.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                  <Check size={14} className="text-[#2D6A4F] shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button disabled={o.actuel}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${o.actuel ? 'bg-gray-50 text-gray-400 cursor-default' : 'bg-[#2D6A4F] text-white hover:bg-[#245a42]'}`}>
              {o.actuel ? 'Plan actuel' : 'Choisir'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={16} className="text-[#2D6A4F]" />
          <h3 className="font-semibold text-[#2D2D2D]">Facturation</h3>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { date: '01/06/2026', montant: '25,00€', statut: 'Payé' },
            { date: '01/05/2026', montant: '25,00€', statut: 'Payé' },
            { date: '01/04/2026', montant: '25,00€', statut: 'Payé' },
          ].map((f, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#2D2D2D]">Abonnement Premium</p>
                <p className="text-xs text-gray-400">{f.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#2D2D2D] font-medium">{f.montant}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium">{f.statut}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}