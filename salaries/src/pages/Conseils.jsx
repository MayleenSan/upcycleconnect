import { useState } from 'react'
import { Plus, X, Lightbulb, CheckCircle, Clock, Edit3, Trash2 } from 'lucide-react'

const baseConseils = [
  { id: 1, titre: 'Comment choisir son bois de récupération ?', contenu: 'Privilégiez des palettes EUR ou EPAL, signalées HT (heat treated), sans traitement chimique. Évitez les palettes MB (méthyl bromure).', categorie: 'Matériaux', statut: 'Publié', date: '10/04/2026' },
  { id: 2, titre: '5 astuces pour poncer un meuble vintage', contenu: 'Commencez par un grain 80 pour enlever la peinture, passez au 120 pour lisser, et finissez au 240 pour un rendu velouté.', categorie: 'Technique', statut: 'Publié', date: '08/04/2026' },
  { id: 3, titre: 'Upcycling textile : les bases', contenu: "La clé d'un bon upcycling textile est de comprendre la composition des tissus. Laine, coton, synthétique : chacun réagit différemment à la teinture et à la découpe.", categorie: 'Textile', statut: 'Brouillon', date: '15/04/2026' },
  { id: 4, titre: 'Valoriser les câbles électriques récupérés', contenu: 'Les câbles cuivre peuvent être dénudés et retravaillés en bijoux, en structures décoratives ou en luminaires.', categorie: 'Électronique', statut: 'Brouillon', date: '18/04/2026' },
]

const categories = ['Matériaux', 'Technique', 'Textile', 'Électronique', 'Mobilier', 'Décoration']
const statusOptions = ['Tous', 'Publié', 'Brouillon']
const emptyForm = { titre: '', contenu: '', categorie: 'Matériaux' }

export default function Conseils() {
  const [conseils, setConseils] = useState(baseConseils)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const displayed = conseils.filter(c => activeFilter === 'Tous' || c.statut === activeFilter)

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const togglePublish = (id) =>
    setConseils(prev => prev.map(c =>
      c.id === id ? { ...c, statut: c.statut === 'Publié' ? 'Brouillon' : 'Publié' } : c
    ))

  const remove = (id) => setConseils(prev => prev.filter(c => c.id !== id))

  const handleSave = () => {
    if (!form.titre || !form.contenu) return
    if (modal === 'ajouter') {
      setConseils(prev => [...prev, {
        id: Date.now(),
        ...form,
        statut: 'Brouillon',
        date: new Date().toLocaleDateString('fr-FR'),
      }])
    } else {
      setConseils(prev => prev.map(c => c.id === selected.id ? { ...c, ...form } : c))
    }
    closeModal()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Conseils & News</h2>
          <p className="text-gray-500 text-sm mt-0.5">Gérez les contenus publiés sur la plateforme</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setModal('ajouter') }}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Nouveau conseil
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {statusOptions.map(opt => (
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
        {displayed.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="bg-[#F8F4EE] p-2 rounded-lg shrink-0">
                  <Lightbulb size={16} className="text-[#2D6A4F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-[#2D2D2D] text-sm">{c.titre}</h3>
                    <span className="text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium px-2 py-0.5 rounded-full">
                      {c.categorie}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{c.contenu}</p>
                  <p className="text-xs text-gray-400 mt-2">{c.date}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                c.statut === 'Publié' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {c.statut === 'Publié' ? <CheckCircle size={11} /> : <Clock size={11} />}
                {c.statut}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => togglePublish(c.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  c.statut === 'Publié'
                    ? 'border-orange-100 text-orange-500 hover:bg-orange-50'
                    : 'border-green-100 text-green-600 hover:bg-green-50'
                }`}
              >
                {c.statut === 'Publié' ? 'Dépublier' : 'Publier'}
              </button>
              <button
                onClick={() => { setSelected(c); setForm({ titre: c.titre, contenu: c.contenu, categorie: c.categorie }); setModal('editer') }}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1"
              >
                <Edit3 size={11} />Éditer
              </button>
              <button
                onClick={() => remove(c.id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-colors flex items-center gap-1"
              >
                <Trash2 size={11} />Supprimer
              </button>
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun contenu dans cette catégorie.</div>
        )}
      </div>

      {(modal === 'ajouter' || modal === 'editer') && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">
              {modal === 'ajouter' ? 'Nouveau conseil' : 'Éditer le conseil'}
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Titre</label>
                <input
                  value={form.titre}
                  onChange={e => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Contenu</label>
                <textarea
                  value={form.contenu}
                  onChange={e => setForm({ ...form, contenu: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Catégorie</label>
                <select
                  value={form.categorie}
                  onChange={e => setForm({ ...form, categorie: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                >
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
              >
                {modal === 'ajouter' ? 'Créer' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}