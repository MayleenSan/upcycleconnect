import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Package, ShoppingBag, Calendar, TrendingUp, BookOpen, X, ChevronRight } from 'lucide-react'

const etapesTutoriel = [
  {
    titre: "Bienvenue sur UpcycleConnect 🌱",
    texte: "Cette plateforme te permet de donner une seconde vie à tes objets. Tu peux déposer des annonces, réserver des formations, suivre ton impact environnemental et bien plus encore."
  },
  {
    titre: "Dépose une annonce",
    texte: "Tu as un objet à donner ou vendre ? Rends-toi dans la section Annonces pour le proposer à la communauté."
  },
  {
    titre: "Accède au catalogue",
    texte: "Découvre les formations, ateliers et événements proposés par UpcycleConnect et réserve directement depuis la plateforme."
  },
  {
    titre: "Suis ton impact",
    texte: "Chaque action compte ! Consulte ton Upcycling Score pour mesurer les déchets que tu as évités et les ressources économisées."
  },
]

export default function Home({ tutorielVu, setTutorielVu }) {
  const [etape, setEtape] = useState(0)
  const navigate = useNavigate()

  const etapeSuivante = () => {
    if (etape < etapesTutoriel.length - 1) {
      setEtape(etape + 1)
    } else {
      setTutorielVu(true)
    }
  }

  return (
    <div>

      {!tutorielVu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl relative">

            <button
              onClick={() => setTutorielVu(true)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <div className="flex gap-1.5 mb-6">
              {etapesTutoriel.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${i <= etape ? 'bg-[#2D6A4F]' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center w-14 h-14 bg-[#F8F4EE] rounded-2xl mb-5 mx-auto">
              <Leaf size={28} className="text-[#2D6A4F]" />
            </div>

            <h2 className="text-xl font-bold text-[#2D2D2D] text-center mb-3">
              {etapesTutoriel[etape].titre}
            </h2>
            <p className="text-gray-500 text-sm text-center leading-relaxed mb-8">
              {etapesTutoriel[etape].texte}
            </p>

            <button
              onClick={etapeSuivante}
              className="w-full bg-[#2D6A4F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors flex items-center justify-center gap-2"
            >
              {etape < etapesTutoriel.length - 1 ? (
                <>Suivant <ChevronRight size={16} /></>
              ) : (
                'Commencer'
              )}
            </button>

            {etape < etapesTutoriel.length - 1 && (
              <button
                onClick={() => setTutorielVu(true)}
                className="w-full text-center text-xs text-gray-400 mt-3 hover:text-gray-600"
              >
                Passer le tutoriel
              </button>
            )}

          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Bonjour 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Que voulez-vous faire aujourd'hui ?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Mes annonces', icone: Package, chemin: '/annonces', couleur: 'bg-[#2D6A4F]' },
          { label: 'Catalogue', icone: ShoppingBag, chemin: '/catalogue', couleur: 'bg-[#74C69D]' },
          { label: 'Mon planning', icone: Calendar, chemin: '/planning', couleur: 'bg-[#2D6A4F]' },
          { label: 'Mon score', icone: TrendingUp, chemin: '/score', couleur: 'bg-[#74C69D]' },
          { label: 'Conseils', icone: BookOpen, chemin: '/conseils', couleur: 'bg-[#2D6A4F]' },
          { label: 'Déposer un objet', icone: Leaf, chemin: '/annonces/nouvelle', couleur: 'bg-[#74C69D]' },
        ].map((item) => {
          const Icone = item.icone
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.chemin)}
              className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col items-center gap-3 hover:shadow-sm transition-shadow"
            >
              <div className={`${item.couleur} p-3 rounded-lg`}>
                <Icone size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-[#2D2D2D]">{item.label}</span>
            </button>
          )
        })}
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4">
        <Leaf size={22} className="text-white shrink-0" />
        <p className="text-white text-sm font-medium italic">
          Chaque objet upcyclé, c'est un déchet en moins et une histoire en plus.
        </p>
      </div>

    </div>
  )
}