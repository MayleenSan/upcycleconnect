import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Leaf } from 'lucide-react'

const conseils = [
  {
    id: 1,
    categorie: 'Textile',
    titre: 'Transformer un jean usé en sac',
    contenu: 'Récupère la partie basse d\'un jean trop abîmé pour être porté. Couds le bas des jambes ensemble, ajoute des anses en tissu ou en cuir et tu obtiens un sac solide et original. Pas besoin de machine à coudre, une aiguille et du fil solide suffisent.',
  },
  {
    id: 2,
    categorie: 'Mobilier',
    titre: 'Relooker une chaise avec de la peinture',
    contenu: 'Une vieille chaise en bois peut retrouver une seconde jeunesse avec un peu de peinture. Ponce légèrement la surface, applique une couche d\'apprêt puis deux couches de peinture acrylique. Tu peux aussi jouer avec les couleurs pour un effet vintage.',
  },
  {
    id: 3,
    categorie: 'Décoration',
    titre: 'Fabriquer des bougies avec des restes de cire',
    contenu: 'Récupère les fonds de bougies que tu n\'utilises plus. Fais fondre la cire au bain-marie, ajoute une mèche dans un pot en verre et verse la cire fondue. Laisse refroidir 24h. Tu peux mélanger les parfums pour créer ta bougie personnalisée.',
  },
  {
    id: 4,
    categorie: 'Jardin',
    titre: 'Créer des pots de fleurs avec des palettes',
    contenu: 'Une palette en bon état peut devenir un jardinière verticale. Glisse des sachets plastiques entre les planches, remplis de terre et plante tes herbes aromatiques ou fleurs. Fixe la palette contre un mur et arrose régulièrement.',
  },
  {
    id: 5,
    categorie: 'Électronique',
    titre: 'Que faire de ses vieux câbles et appareils ?',
    contenu: 'Ne jette jamais tes appareils électroniques à la poubelle. Dépose-les dans un point de collecte DEEE ou apporte-les en magasin. Certains composants peuvent être réutilisés et les métaux précieux récupérés. Les câbles USB en bon état peuvent être donnés via la plateforme.',
  },
]

const categories = ['Tous', 'Textile', 'Mobilier', 'Décoration', 'Jardin', 'Électronique']

export default function Conseils() {
  const [filtre, setFiltre] = useState('Tous')
  const [ouvert, setOuvert] = useState(null)

  const filtres = conseils.filter(c => filtre === 'Tous' || c.categorie === filtre)

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Conseils & Astuces</h2>
        <p className="text-gray-500 text-sm mt-0.5">Idées et tutoriels pour upcycler chez toi</p>
      </div>

      <div className="bg-[#2D6A4F] rounded-xl p-5 flex items-center gap-4 mb-6">
        <Leaf size={22} className="text-white shrink-0" />
        <p className="text-white text-sm">
          Chaque semaine, de nouveaux conseils sont ajoutés par notre équipe de formateurs.
        </p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFiltre(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filtre === c
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtres.map(conseil => (
          <div key={conseil.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOuvert(ouvert === conseil.id ? null : conseil.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#F8F4EE] p-2 rounded-lg">
                  <BookOpen size={15} className="text-[#2D6A4F]" />
                </div>
                <div>
                  <p className="font-medium text-[#2D2D2D] text-sm">{conseil.titre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{conseil.categorie}</p>
                </div>
              </div>
              {ouvert === conseil.id
                ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                : <ChevronDown size={16} className="text-gray-400 shrink-0" />
              }
            </button>

            {ouvert === conseil.id && (
              <div className="px-5 pb-5">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{conseil.contenu}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}