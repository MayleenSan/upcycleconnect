import { Bell, UserCircle } from 'lucide-react'

export default function Header({ titre }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-10">
      
      {/* titre de la page */}
      <h1 className="text-lg font-semibold text-[#2D2D2D]">{titre}</h1>

      {/* ctions */}
      <div className="flex items-center gap-4">
        
        {/* notifs */}
        <button className="relative p-2 rounded-lg hover:bg-[#F8F4EE] transition-colors">
          <Bell size={20} className="text-[#2D2D2D]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2D6A4F] rounded-full"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-[#F8F4EE] px-3 py-1.5 rounded-lg transition-colors">
          <UserCircle size={22} className="text-[#2D6A4F]" />
          <span className="text-sm font-medium text-[#2D2D2D]">Mayleen San</span>
        </div>

      </div>
    </header>
  )
}