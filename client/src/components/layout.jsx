import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  Home, Package, PlusSquare, Archive, ShoppingBag,
  Leaf, BookOpen, Calendar, User, LogOut, Menu, X
} from 'lucide-react'

const nav = [
  { label: 'Accueil', chemin: '/', icone: Home },
  { label: 'Annonces', chemin: '/annonces', icone: Package },
  { label: 'Déposer un objet', chemin: '/annonces/nouvelle', icone: PlusSquare },
  { label: 'Conteneur', chemin: '/conteneur', icone: Archive },
  { label: 'Catalogue', chemin: '/catalogue', icone: ShoppingBag },
  { label: 'Mon score', chemin: '/score', icone: Leaf },
  { label: 'Conseils', chemin: '/conseils', icone: BookOpen },
  { label: 'Planning', chemin: '/planning', icone: Calendar },
  { label: 'Mon profil', chemin: '/profil', icone: User },
]

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex">

      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 fixed h-full">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-[#2D6A4F] text-sm">UpcycleConnect</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {nav.map((item) => {
            const Icone = item.icone
            const actif = location.pathname === item.chemin
            return (
              <Link
                key={item.chemin}
                to={item.chemin}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  actif
                    ? 'bg-[#2D6A4F] text-white font-medium'
                    : 'text-gray-600 hover:bg-[#F8F4EE]'
                }`}
              >
                <Icone size={17} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 w-full transition-colors"
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-7 h-7 object-contain" />
          <span className="font-bold text-[#2D6A4F] text-sm">UpcycleConnect</span>
        </div>
        <button onClick={() => setMenuOuvert(!menuOuvert)}>
          {menuOuvert ? <X size={22} className="text-gray-600" /> : <Menu size={22} className="text-gray-600" />}
        </button>
      </div>

      {menuOuvert && (
        <div className="md:hidden fixed inset-0 bg-white z-10 pt-16 px-4">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const Icone = item.icone
              return (
                <Link
                  key={item.chemin}
                  to={item.chemin}
                  onClick={() => setMenuOuvert(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-600 hover:bg-[#F8F4EE]"
                >
                  <Icone size={17} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      <main className="flex-1 md:ml-60 pt-4 md:pt-0">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

    </div>
  )
}
