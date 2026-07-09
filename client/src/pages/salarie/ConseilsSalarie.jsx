import { useState } from 'react'
import { Plus, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'

const conseilsInit = [
  { id: 1, titre: 'Transformer un jean usé en sac', categorie: 'Textile', statut: 'Publié', signalements: 0 },
  { id: 2, titre: 'Relooker une chaise avec de la peinture', categorie: 'Mobilier', statut: 'Publié', signalements: 0 },
  { id: 3, titre: 'Fabriquer des bougies avec des restes de cire', categorie: 'Décoration', statut: 'Publié', signalements: 1 },
  { id: 4, titre: 'Créer des pots de fleurs avec des palettes', categorie: 'Jardin', statut: 'Brouillon', signalements: 0 },
]

export default function ConseilsSalarie() {
  const [conseils, setConseils] = useState(conseilsInit)
  const [afficherForm, setAfficherForm] = useState(false)
  const [form, setForm] = useState({ titre: '', categorie: '', contenu: '' })

  const supprimer = (id) => setConseils(conseils.filter(c => c.id !== id))

  const handleSubmit = () => {
    if (!form.titre || !form.categorie || !form.contenu) return
    setConseils([...conseils, { id: Date.now(), titre: form.titre, categorie: form.categorie, statut: 'Brouillon', signalements: 0 }])
    setForm({ titre: '', categorie: '', contenu: '' })
    setAfficherForm(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Conseils & Modération</h2>
          <p className="text-gray-500 text-sm mt-0.5">Gérer vos contenus et modérer les signalements</p>
        </div>
        <button onClick={() => setAfficherForm(true)}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
          <Plus size={16} />Nouveau conseil
        </button>
      </div>

      {conseils.filter(c => c.signalements > 0).length > 0 && (
        <div className="mb-4 px-4 py-3 bg-orange-50 border border-orange-100 rounded-lg flex items-center gap-2 text-sm text-orange-600">
          <AlertCircle size={16} />
          {conseils.filter(c => c.signalements > 0).length} conseil(s) avec des signalements à traiter.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {conseils.map(c => (
          <div key={c.id} className={`bg-white rounded-xl border p-5 ${c.signalements > 0 ? 'border-orange-200' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#2D2D2D]">{c.titre}</h3>
                  {c.statut === 'Publié'
                    ? <CheckCircle size={14} className="text-green-500" />
                    : <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Brouillon</span>
                  }
                </div>
                <p className="text-xs text-gray-400">{c.categorie}</p>
                {c.signalements > 0 && (
                  <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={11} />{c.signalements} signalement(s)
                  </p>
                )}
              </div>
              <button onClick={() => supprimer(c.id)}
                className="text-gray-300 hover:text-red-400 transition-colors p-1">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {afficherForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">Nouveau conseil</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Titre</label>
                <input value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })}
                  placeholder="Ex: Comment transformer une vieille chemise..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Catégorie</label>
                <select value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] bg-white">
                  <option value="">Choisir...</option>
                  <option>Textile</option><option>Mobilier</option><option>Décoration</option>
                  <option>Jardin</option><option>Électronique</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Contenu</label>
                <textarea value={form.contenu} onChange={e => setForm({ ...form, contenu: e.target.value })}
                  rows={4} placeholder="Décris les étapes..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setAfficherForm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Annuler</button>
              <button onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42]">Publier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}