import { useState } from 'react'
import { Plus, X, FolderOpen, Calendar, CheckCircle, Clock, Image } from 'lucide-react'

const baseProjets = [
  {
    id: 1,
    titre: 'Banc de jardin palettes',
    statut: 'En cours',
    debut: '2026-03-10',
    description: "Fabrication d'un banc de jardin à partir de 3 palettes récupérées.",
    etapes: ['Récupération palettes', 'Ponçage', 'Assemblage'],
    etapesTerminees: ['Récupération palettes', 'Ponçage'],
    materiau: 'Palette en bois',
  },
  {
    id: 2,
    titre: 'Table basse câbles',
    statut: 'Terminé',
    debut: '2026-02-01',
    description: 'Table basse originale avec structure en câbles de cuivre tressés.',
    etapes: ['Conception', 'Récupération matériaux', 'Fabrication', 'Finition'],
    etapesTerminees: ['Conception', 'Récupération matériaux', 'Fabrication', 'Finition'],
    materiau: 'Câbles cuivre',
  },
  {
    id: 3,
    titre: 'Luminaire textile',
    statut: 'En cours',
    debut: '2026-04-01',
    description: "Création d'un luminaire suspendu avec des chutes de tissu recyclées.",
    etapes: ['Design', 'Collecte tissus', 'Assemblage', 'Câblage'],
    etapesTerminees: ['Design'],
    materiau: 'Tissus variés',
  },
]

const emptyForm = { titre: '', description: '', materiau: '', etapes: '' }

const getProgress = (p) =>
  p.etapes.length > 0 ? Math.round((p.etapesTerminees.length / p.etapes.length) * 100) : 0

export default function Projets() {
  const [projets, setProjets] = useState(baseProjets)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleAdd = () => {
    if (!form.titre || !form.description) return
    const etapes = form.etapes.split(',').map(e => e.trim()).filter(Boolean)
    const newProjet = {
      id: Date.now(),
      titre: form.titre,
      statut: 'En cours',
      debut: new Date().toISOString().split('T')[0],
      description: form.description,
      materiau: form.materiau,
      etapes,
      etapesTerminees: [],
    }
    setProjets(prev => [...prev, newProjet])
    closeModal()
  }

  const toggleStep = (etape) => {
    if (!selected) return
    const etapesTerminees = selected.etapesTerminees.includes(etape)
      ? selected.etapesTerminees.filter(e => e !== etape)
      : [...selected.etapesTerminees, etape]
    const updated = {
      ...selected,
      etapesTerminees,
      statut: etapesTerminees.length === selected.etapes.length ? 'Terminé' : 'En cours',
    }
    setProjets(prev => prev.map(p => p.id === selected.id ? updated : p))
    setSelected(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Mes projets d'upcycling</h2>
          <p className="text-gray-500 text-sm mt-0.5">Suivi et mise en avant de vos créations</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setModal('ajouter') }}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Nouveau projet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projets.map(p => (
          <div
            key={p.id}
            onClick={() => { setSelected(p); setModal('voir') }}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#F8F4EE] p-2 rounded-lg">
                <FolderOpen size={16} className="text-[#2D6A4F]" />
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                p.statut === 'Terminé' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
              }`}>
                {p.statut}
              </span>
            </div>
            <h3 className="font-semibold text-[#2D2D2D] mb-2">{p.titre}</h3>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{p.description}</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progression</span>
                <span>{getProgress(p)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-[#2D6A4F] h-1.5 rounded-full transition-all"
                  style={{ width: `${getProgress(p)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={11} />
              {new Date(p.debut).toLocaleDateString('fr-FR')}
            </div>
          </div>
        ))}
      </div>

      {modal === 'voir' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2D2D2D]">{selected.titre}</h3>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                selected.statut === 'Terminé' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
              }`}>
                {selected.statut}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{selected.description}</p>
            {selected.materiau && (
              <p className="text-xs text-gray-400 mb-4">
                Matériau : <span className="font-medium text-[#2D2D2D]">{selected.materiau}</span>
              </p>
            )}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Progression</span>
                <span>{getProgress(selected)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div
                  className="bg-[#2D6A4F] h-2 rounded-full transition-all"
                  style={{ width: `${getProgress(selected)}%` }}
                />
              </div>
              <h4 className="font-semibold text-[#2D2D2D] text-sm mb-3">Étapes</h4>
              <div className="flex flex-col gap-2">
                {selected.etapes.map(etape => {
                  const done = selected.etapesTerminees.includes(etape)
                  return (
                    <button
                      key={etape}
                      onClick={() => toggleStep(etape)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                        done ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {done
                        ? <CheckCircle size={16} className="text-green-500 shrink-0" />
                        : <Clock size={16} className="text-gray-300 shrink-0" />
                      }
                      <span className={`text-sm ${done ? 'text-green-700 line-through' : 'text-[#2D2D2D]'}`}>
                        {etape}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="bg-[#F8F4EE] rounded-xl p-4 flex items-center gap-3 mb-4">
              <Image size={16} className="text-[#2D6A4F]" />
              <p className="text-xs text-gray-500">
                Partagez votre progression avec la communauté en ajoutant des photos.
              </p>
            </div>
            <button
              onClick={closeModal}
              className="w-full py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {modal === 'ajouter' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-5">Nouveau projet</h3>
            <div className="flex flex-col gap-4">
              {[['titre', 'Titre du projet'], ['materiau', 'Matériau principal']].map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">{label}</label>
                  <input
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">
                  Étapes (séparées par des virgules)
                </label>
                <input
                  value={form.etapes}
                  onChange={e => setForm({ ...form, etapes: e.target.value })}
                  placeholder="Conception, Fabrication, Finition"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
                />
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
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}