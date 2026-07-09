import { useState } from 'react'
import { Archive, MapPin, CheckCircle, QrCode } from 'lucide-react'

const conteneurs = [
  { id: 1, nom: 'Conteneur Lafayette', adresse: '174 rue La Fayette, Paris 10ème', objets: 3, statut: 'Disponible' },
  { id: 2, nom: 'Conteneur Montreuil', adresse: '12 rue de la République, Montreuil', objets: 1, statut: 'Disponible' },
  { id: 3, nom: 'Conteneur Ivry', adresse: '8 avenue de Paris, Ivry-sur-Seine', objets: 5, statut: 'Disponible' },
  { id: 4, nom: 'Conteneur 13ème', adresse: '45 bd Auguste Blanqui, Paris 13ème', objets: 0, statut: 'Vide' },
]

export default function ConteneursProPage() {
  const [selected, setSelected] = useState(null)
  const [recupere, setRecupere] = useState([])

  const handleRecuperer = (id) => {
    setRecupere([...recupere, id])
    setSelected(null)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Conteneurs</h2>
        <p className="text-gray-500 text-sm mt-0.5">Récupérez des objets dans nos points de collecte</p>
      </div>

      <div className="bg-[#F8F4EE] rounded-xl p-4 mb-6 flex gap-3 items-start">
        <QrCode size={18} className="text-[#2D6A4F] shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600">
          Scannez le code barre fourni par le particulier au niveau du conteneur pour récupérer l'objet.
          Votre abonnement premium vous donne un accès prioritaire aux nouveaux dépôts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conteneurs.map(c => {
          const dejaRecupere = recupere.includes(c.id)
          return (
            <div key={c.id} className={`bg-white rounded-xl border p-5 transition-shadow hover:shadow-sm ${dejaRecupere ? 'border-green-200' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${c.statut === 'Disponible' ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <Archive size={18} className={c.statut === 'Disponible' ? 'text-green-500' : 'text-gray-400'} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2D2D]">{c.nom}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} />{c.adresse}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.statut === 'Disponible' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {c.statut}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {c.objets} objet{c.objets !== 1 ? 's' : ''} disponible{c.objets !== 1 ? 's' : ''}
              </p>

              {dejaRecupere ? (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle size={16} />Récupération enregistrée
                </div>
              ) : (
                <button
                  onClick={() => c.objets > 0 && setSelected(c)}
                  disabled={c.objets === 0}
                  className="w-full py-2 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Récupérer un objet
                </button>
              )}
            </div>
          )
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Confirmer la récupération</h3>
            <p className="text-gray-500 text-sm mb-6">
              Vous allez enregistrer une récupération au <strong>{selected.nom}</strong>.
              Assurez-vous d'être sur place avec votre code d'accès professionnel.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button onClick={() => handleRecuperer(selected.id)}
                className="flex-1 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}