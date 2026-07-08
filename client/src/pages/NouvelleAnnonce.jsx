import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

export default function NouvelleAnnonce() {
  const [form, setForm] = useState({
    titre: '',
    categorie: '',
    type: 'Don',
    localisation: '',
    description: '',
  })
  const [succes, setSucces] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.titre || !form.categorie || !form.localisation || !form.description) return
    setSucces(true)
    setTimeout(() => navigate('/annonces'), 2000)
  }

  return (
    <div>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/annonces')}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Nouvelle annonce</h2>
          <p className="text-gray-500 text-sm mt-0.5">Proposer un objet à la communauté</p>
        </div>
      </div>

      {succes && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600">
          Annonce déposée ! Redirection en cours...
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6">

        <div className="mb-5">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Titre de l'annonce</label>
          <input
            name="titre"
            type="text"
            placeholder="Ex: Chaise en bois, lot de tissu..."
            value={form.titre}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>

        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Catégorie</label>
            <select
              name="categorie"
              value={form.categorie}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] bg-white"
            >
              <option value="">Choisir...</option>
              <option>Mobilier</option>
              <option>Textile</option>
              <option>Électronique</option>
              <option>Décoration</option>
              <option>Autre</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Type</label>
            <div className="flex gap-2">
              {['Don', 'Vente'].map(t => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                    form.type === t
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Localisation</label>
          <input
            name="localisation"
            type="text"
            placeholder="Ex: Paris 10ème, Montreuil..."
            value={form.localisation}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Description</label>
          <textarea
            name="description"
            placeholder="Décris l'objet, son état, ses dimensions..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Photo (optionnel)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center gap-2 text-gray-400 hover:border-[#74C69D] transition-colors cursor-pointer">
            <Upload size={20} />
            <p className="text-sm">Cliquer pour ajouter une photo</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          Déposer l'annonce
        </button>

      </div>
    </div>
  )
}