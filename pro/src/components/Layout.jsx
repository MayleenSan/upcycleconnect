import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, Package, FolderOpen, Bell, Briefcase, User, LogOut, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Tableau de bord', path: '/', icon: LayoutDashboard },
  { label: 'Annonces', path: '/annonces', icon: Package },
  { label: 'Mes projets', path: '/projets', icon: FolderOpen },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Mon abonnement', path: '/abonnement', icon: Briefcase },
  { label: 'Mon profil', path: '/profil', icon: User },
]

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex">
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 fixed h-full">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          <div>
            <span className="font-bold text-[#2D6A4F] text-sm block">UpcycleConnect</span>
            <span className="text-xs text-gray-400">Espace Pro</span>
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? 'bg-[#2D6A4F] text-white font-medium' : 'text-gray-600 hover:bg-[#F8F4EE]'
                }`}
              >
                <Icon size={17} />
                {label}
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
          <span className="font-bold text-[#2D6A4F] text-sm">Pro</span>
        </div>
        <button onClick={() => setMobileOpen(prev => !prev)}>
          {mobileOpen
            ? <X size={22} className="text-gray-600" />
            : <Menu size={22} className="text-gray-600" />
          }
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-10 pt-16 px-4">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-600 hover:bg-[#F8F4EE]"
              >
                <Icon size={17} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1 md:ml-60 pt-4 md:pt-0">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}