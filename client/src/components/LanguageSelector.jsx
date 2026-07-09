import { useTranslation } from '../hooks/useTranslation'

const langues = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSelector() {
  const { langue, changerLangue } = useTranslation()

  return (
    <div className="flex gap-1">
      {langues.map(l => (
        <button
          key={l.code}
          onClick={() => changerLangue(l.code)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            langue === l.code
              ? 'bg-[#2D6A4F] text-white'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}