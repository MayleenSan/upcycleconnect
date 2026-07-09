import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MapPin, Tag } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8085'

export default function Annonces() {
  const [annonces, setAnnonces] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const navigate = useNavigate()

  useEffect(() => {
    const chargerAnnonces = async () => {
      try {
        const res = await fetch(`${API}/api/annonces/`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setAnnonces(data || [])
      } catch {
        setErreur("Impossible de charger les annonces. Le serveur est-il lancé ?")
      } finally {
        setChargement(false)
      }
    }
    chargerAnnonces()
  }, [])

  const filtrees = annonces.filter(a => {
    const matchRecherche = a.titre.toLowerCase().includes(recherche.toLowerCase())
    const matchFiltre = filtre === 'Tous' || a.type === filtre
    return matchRecherche && matchFiltre
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR')
  }

  return (
    <div>

      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Annonces</h2>
          <p className="text-gray-500 text-sm mt-0.5">Objets disponibles à récupérer</p>
        </div>
        <button
          onClick={() => navigate('/annonces/nouvelle')}
          className="flex items-center gap-2 bg-[#2D6A4F] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors"
        >
          <Plus size={16} />
          Déposer
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#74C69D] bg-white"
          />
        </div>
        <div className="flex gap-2">
          {['Tous', 'Don', 'Vente'].map(f => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                filtre === f
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* etat de chargement / erreur */}
      {chargement && (
        <div className="text-center text-gray-400 py-16 text-sm">Chargement des annonces...</div>
      )}

      {!chargement && erreur && (
        <div className="text-center text-red-400 py-16 text-sm">{erreur}</div>
      )}

      {/* liste */}
      {!chargement && !erreur && (
        filtrees.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-sm">Aucune annonce trouvée.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtrees.map(annonce => (
              <div key={annonce.id_annonce} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-[#2D2D2D]">{annonce.titre}</h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    annonce.type === 'Don'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-orange-50 text-orange-500'
                  }`}>
                    {annonce.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{annonce.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {annonce.localisation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={12} />
                    {annonce.categorie}
                  </span>
                  <span className="ml-auto">{formatDate(annonce.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  )
}