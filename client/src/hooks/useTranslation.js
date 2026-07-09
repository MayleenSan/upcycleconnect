import { useState, useEffect } from 'react'
import fr from '../i18n/fr.json'
import en from '../i18n/en.json'

const dicos = { fr, en }

// langue stockée dans le localStorage pour persister entre les sessions
function getLangueInitiale() {
  return localStorage.getItem('uc_lang') || 'fr'
}

// hook partagé via un état module-level pour synchroniser tous les composants
let langueGlobale = getLangueInitiale()
const listeners = new Set()

function setLangueGlobale(l) {
  langueGlobale = l
  localStorage.setItem('uc_lang', l)
  listeners.forEach(fn => fn(l))
}

export function useTranslation() {
  const [langue, setLangue] = useState(langueGlobale)

  // s'abonner aux changements de langue (et se désabonner au démontage,
  // sinon les setters s'accumulent dans le Set à chaque navigation)
  useEffect(() => {
    listeners.add(setLangue)
    return () => listeners.delete(setLangue)
  }, [])

  const t = (cle) => {
    const parties = cle.split('.')
    let val = dicos[langue]
    for (const p of parties) {
      val = val?.[p]
    }
    return val || cle
  }

  return { t, langue, changerLangue: setLangueGlobale }
}