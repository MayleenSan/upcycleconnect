import { LayoutDashboard, Users, Wrench, Tag, CalendarDays } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const liens = [
  { nom: "Dashboard", chemin: "/", icone: LayoutDashboard },
  { nom: "Utilisateurs", chemin: "/utilisateurs", icone: Users },
  { nom: "Prestations", chemin: "/prestations", icone: Wrench },
  { nom: "Catégories", chemin: "/categories", icone: Tag },
  { nom: "Événements", chemin: "/evenements", icone: CalendarDays },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <img src="/logo.png" alt="UpcycleConnect" className="w-9 h-9 object-contain" />
        <span className="font-bold text-[#2D6A4F] text-lg tracking-tight">UpcycleConnect</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {liens.map((lien) => {
          const Icone = lien.icone
          const actif = location.pathname === lien.chemin
          return (
            <Link
              key={lien.chemin}
              to={lien.chemin}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${actif
                  ? "bg-[#2D6A4F] text-white"
                  : "text-[#2D2D2D] hover:bg-[#F8F4EE] hover:text-[#2D6A4F]"
                }`}
            >
              <Icone size={18} />
              {lien.nom}
            </Link>
          )
        })}
      </nav>

      {/* Footer sidebar */}
      <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400">
        Admin v1.0 — UpcycleConnect
      </div>
    </aside>
  )
}