import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8085'

export default function NouvelleAnnonce() {
  const [form, setForm] = useState({
    titre: '',
    categorie: '',
    type: 'Don',
    localisation: '',
    description: '',
  })
  const [succes, setSucces] = useState(false)
  const [erreur, setErreur] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.titre || !form.categorie || !form.localisation || !form.description) {
      setErreur('Merci de remplir tous les champs obligatoires.')
      return
    }

    setEnvoi(true)
    setErreur('')

    const uUser = localStorage.getItem('uc_user')
    const idUser = uUser ? JSON.parse(uUser).id_users : null

    try {
      const res = await fetch(`${API}/api/annonces/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_users: idUser,
          titre: form.titre,
          categorie: form.categorie,
          type: form.type,
          localisation: form.localisation,
          description: form.description,
        }),
      })
      if (!res.ok) throw new Error()
      setSucces(true)
      setTimeout(() => navigate('/annonces'), 1500)
    } catch {
      setErreur("Impossible de déposer l'annonce. Le serveur est-il lancé ?")
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <div>

      {/* header */}
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

      {erreur && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500">
          {erreur}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6">

        {/* titre */}
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

        {/* categorie + type */}
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

        {/* localisation */}
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

        {/* description */}
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

        {/* photo */}
        <div className="mb-6">
          <label className="text-sm font-medium text-[#2D2D2D] mb-1.5 block">Photo (optionnel)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center gap-2 text-gray-400 hover:border-[#74C69D] transition-colors cursor-pointer">
            <Upload size={20} />
            <p className="text-sm">Cliquer pour ajouter une photo</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={envoi}
          className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors disabled:opacity-60"
        >
          {envoi ? 'Envoi...' : "Déposer l'annonce"}
        </button>

      </div>
    </div>
  )
}