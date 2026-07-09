import { createContext, useContext, useState } from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('uc_user')
    return s ? JSON.parse(s) : null
  })

  const login = (userData) => {
    localStorage.setItem('uc_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('uc_user')
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, connecte: !!user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}