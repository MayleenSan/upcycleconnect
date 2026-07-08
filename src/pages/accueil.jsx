import { Link } from 'react-router-dom'
import { Recycle, ArrowRight, Leaf, Users, Package } from 'lucide-react'

export default function Accueil() {
  return (
    <div className="min-h-screen bg-[#F8F4EE] flex flex-col">

      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="UpcycleConnect" className="w-9 h-9 object-contain" />
          <span className="font-bold text-[#2D6A4F] text-lg">UpcycleConnect</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-[#2D6A4F] hover:underline">
            Se connecter
          </Link>
          <Link to="/register" className="px-4 py-2 text-sm font-medium bg-[#2D6A4F] text-white rounded-lg hover:bg-[#245a42] transition-colors">
            S'inscrire
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="bg-[#74C69D]/20 p-4 rounded-2xl mb-6">
          <Recycle size={40} className="text-[#2D6A4F]" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2D2D] max-w-2xl leading-tight">
          Donnez une seconde vie à vos objets
        </h1>
        <p className="text-gray-500 text-lg mt-5 max-w-xl">
          UpcycleConnect met en relation particuliers, professionnels et salariés
          autour du réemploi et de l'upcycling.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link to="/register"
            className="flex items-center justify-center gap-2 bg-[#2D6A4F] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#245a42] transition-colors">
            Créer un compte
            <ArrowRight size={16} />
          </Link>
          <Link to="/login"
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-[#2D2D2D] px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#F8F4EE] transition-colors">
            J'ai déjà un compte
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-3xl w-full">
          {[
            { icone: Leaf, titre: 'Écologique', texte: 'Réduisez les déchets en réutilisant.' },
            { icone: Users, titre: 'Communauté', texte: 'Particuliers, pros et salariés réunis.' },
            { icone: Package, titre: 'Simple', texte: 'Déposez et trouvez des objets facilement.' },
          ].map((a, i) => {
            const Icone = a.icone
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 text-left">
                <div className="bg-[#F8F4EE] w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Icone size={18} className="text-[#2D6A4F]" />
                </div>
                <h3 className="font-semibold text-[#2D2D2D] mb-1">{a.titre}</h3>
                <p className="text-sm text-gray-500">{a.texte}</p>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        UpcycleConnect — {new Date().getFullYear()}
      </footer>
    </div>
  )
}
