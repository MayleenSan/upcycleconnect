import { useState } from 'react'
import { MessageSquare, AlertTriangle, CheckCircle, Trash2, Eye, Flag, ChevronDown, ChevronUp } from 'lucide-react'

const baseForums = [
  {
    id: 1,
    titre: 'Techniques de ponçage sur métal récupéré',
    auteur: 'Forge & Patine',
    date: '10/04/2026',
    posts: 8,
    signalements: 1,
    statut: 'Actif',
    messages: [
      { id: 1, auteur: 'Forge & Patine', date: '10/04/2026', contenu: "Salut, quelqu'un a des conseils pour poncer des cadres métalliques sans trop de poussière ?", signale: false },
      { id: 2, auteur: 'Brocante du Canal', date: '11/04/2026', contenu: 'Essaie une ponceuse orbitale avec masque FFP2, ça change la vie !', signale: true },
      { id: 3, auteur: 'Camille R.', date: '12/04/2026', contenu: "Le mouillé-humide c'est bien aussi pour éviter la poussière fine.", signale: false },
    ],
  },
  {
    id: 2,
    titre: 'Où trouver des palettes gratuites à Paris ?',
    auteur: 'Petit Sacha',
    date: '08/04/2026',
    posts: 23,
    signalements: 2,
    statut: 'Actif',
    messages: [
      { id: 1, auteur: 'Petit Sacha', date: '08/04/2026', contenu: 'Je cherche des palettes pour un projet de meuble, des bons plans ?', signale: false },
      { id: 2, auteur: 'Caron Elise', date: '08/04/2026', contenu: 'Les magasins Lidl/Aldi souvent en ont, demandez au gérant directement !', signale: false },
      { id: 3, auteur: 'Spam Bot', date: '09/04/2026', contenu: 'Achetez vos palettes discount sur pal3t-discount.ru !!!', signale: true },
    ],
  },
  {
    id: 3,
    titre: "Retours sur l'atelier bijoux du mois dernier",
    auteur: 'Caron Elise',
    date: '05/04/2026',
    posts: 12,
    signalements: 0,
    statut: 'Actif',
    messages: [
      { id: 1, auteur: 'Caron Elise', date: '05/04/2026', contenu: 'Super atelier ! Les conseils sur la résine époxy étaient précieux.', signale: false },
      { id: 2, auteur: 'Moulin Axel', date: '06/04/2026', contenu: "Pareil, j'ai pu finir mon projet grâce à ça. Merci l'équipe !", signale: false },
    ],
  },
]

const filterOptions = ['Tous', 'Signalés', 'Sans signalement']

export default function ForumsSalarie() {
  const [forums, setForums] = useState(baseForums)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [expandedId, setExpandedId] = useState(null)

  const displayed = forums.filter(f => {
    if (activeFilter === 'Signalés') return f.signalements > 0
    if (activeFilter === 'Sans signalement') return f.signalements === 0
    return true
  })

  const deleteMessage = (forumId, msgId) => {
    setForums(prev => prev.map(f => {
      if (f.id !== forumId) return f
      const msg = f.messages.find(m => m.id === msgId)
      return {
        ...f,
        messages: f.messages.filter(m => m.id !== msgId),
        posts: f.posts - 1,
        signalements: Math.max(0, f.signalements - (msg?.signale ? 1 : 0)),
      }
    }))
  }

  const dismissReport = (forumId, msgId) => {
    setForums(prev => prev.map(f =>
      f.id !== forumId ? f : {
        ...f,
        messages: f.messages.map(m => m.id === msgId ? { ...m, signale: false } : m),
        signalements: Math.max(0, f.signalements - 1),
      }
    ))
  }

  const closeThread = (id) => {
    setForums(prev => prev.map(f => f.id === id ? { ...f, statut: 'Fermé' } : f))
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Modération des forums</h2>
        <p className="text-gray-500 text-sm mt-0.5">Suivez et modérez les échanges de la communauté</p>
      </div>

      <div className="flex gap-2 mb-6">
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === opt
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {displayed.map(forum => (
          <div key={forum.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-[#F8F4EE] p-2 rounded-lg shrink-0">
                    <MessageSquare size={16} className="text-[#2D6A4F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D] text-sm">{forum.titre}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Par {forum.auteur} · {forum.date} · {forum.posts} messages
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {forum.signalements > 0 && (
                    <span className="flex items-center gap-1 text-xs bg-red-50 text-red-500 font-medium px-2.5 py-1 rounded-full">
                      <AlertTriangle size={11} />
                      {forum.signalements}
                    </span>
                  )}
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    forum.statut === 'Actif' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {forum.statut}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setExpandedId(expandedId === forum.id ? null : forum.id)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Eye size={12} />
                  Voir messages
                  {expandedId === forum.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                {forum.statut === 'Actif' && (
                  <button
                    onClick={() => closeThread(forum.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-orange-100 text-orange-500 hover:bg-orange-50 transition-colors"
                  >
                    Fermer le fil
                  </button>
                )}
              </div>
            </div>

            {expandedId === forum.id && (
              <div className="border-t border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-3">
                {forum.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`rounded-xl p-4 border ${
                      msg.signale ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#2D2D2D]">{msg.auteur}</span>
                          <span className="text-xs text-gray-400">{msg.date}</span>
                          {msg.signale && (
                            <span className="flex items-center gap-1 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                              <Flag size={10} />Signalé
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{msg.contenu}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        {msg.signale && (
                          <button
                            onClick={() => dismissReport(forum.id, msg.id)}
                            title="Ignorer le signalement"
                            className="p-1.5 rounded-lg border border-green-100 text-green-500 hover:bg-green-50 transition-colors"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(forum.id, msg.id)}
                          title="Supprimer"
                          className="p-1.5 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {displayed.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun forum dans cette catégorie.</div>
        )}
      </div>
    </div>
  )
}