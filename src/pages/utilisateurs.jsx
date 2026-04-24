import { useState } from 'react'
import { users } from '../data/users'
import { Search, UserPlus, CheckCircle, XCircle } from 'lucide-react'

export default function Utilisateurs() {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')

  const filtres = ['Tous', 'Particulier', 'Prestataire', 'Admin']

  const utilisateursFiltres = users.filter(u => {
    const matchRecherche = u.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      u.email.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || u.type === filtre
    return matchRecherche && matchFiltre
  })

  return (
    <div>
      {/* en tete */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Utilisateurs</h2>
          <p className="text-gray-500 text-sm mt-1">{users.length} utilisateurs enregistrés</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
          <UserPlus size={16} />
          Ajouter
        </button>
      </div>

      {/* riltres + recherche */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>
        <div className="flex gap-2">
          {filtres.map(f => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${filtre === f
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-gray-200 text-[#2D2D2D] hover:bg-[#F8F4EE]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* tableau */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#F8F4EE]">
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Nom</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Type</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Statut</th>
              <th className="text-left px-6 py-3 font-semibold text-[#2D2D2D]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateursFiltres.map((u, index) => (
              <tr key={u.id} className={`border-b border-gray-50 hover:bg-[#F8F4EE] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-6 py-4 font-medium text-[#2D2D2D]">{u.nom}</td>
                <td className="px-6 py-4 text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${u.type === 'Admin' ? 'bg-[#2D6A4F] text-white' :
                      u.type === 'Prestataire' ? 'bg-[#74C69D]/30 text-[#2D6A4F]' :
                      'bg-gray-100 text-gray-600'}`}>
                    {u.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium
                    ${u.statut === 'Actif' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
                    {u.statut === 'Actif' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {u.statut}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-[#F8F4EE] transition-colors">
                      Voir
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {utilisateursFiltres.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Aucun utilisateur trouvé
          </div>
        )}
      </div>
    </div>
  )
}