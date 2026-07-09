import { useLocation, useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, Users, Wrench, Tag, CalendarDays, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const nav = [
  { label: 'Dashboard', chemin: '/admin', icone: LayoutDashboard },
  { label: 'Utilisateurs', chemin: '/admin/utilisateurs', icone: Users },
  { label: 'Prestations', chemin: '/admin/prestations', icone: Wrench },
  { label: 'Catégories', chemin: '/admin/categories', icone: Tag },
  { label: 'Événements', chemin: '/admin/evenements', icone: CalendarDays },
]

export default function LayoutAdmin({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex">
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 fixed h-full">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-1">
            <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-[#2D6A4F] text-sm">UpcycleConnect</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">Administration</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {nav.map(item => {
            const Icone = item.icone
            const actif = location.pathname === item.chemin
            return (
              <Link key={item.chemin} to={item.chemin}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  actif ? 'bg-[#2D6A4F] text-white font-medium' : 'text-gray-600 hover:bg-[#F8F4EE]'
                }`}>
                <Icone size={17} />{item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-gray-100">
          {user && (
            <p className="px-3 pb-2 text-xs text-gray-400 truncate">{user.mail}</p>
          )}
          <button onClick={() => { logout(); navigate('/login') }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 w-full transition-colors">
            <LogOut size={17} />Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 md:ml-60">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}