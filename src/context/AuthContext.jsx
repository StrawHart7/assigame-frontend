import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(() => {
    const stored = localStorage.getItem('utilisateur')
    return stored ? JSON.parse(stored) : null
  })

  const login = (userData) => {
    localStorage.setItem('utilisateur', JSON.stringify(userData))
    setUtilisateur(userData)
  }

  const logout = () => {
    localStorage.removeItem('utilisateur')
    setUtilisateur(null)
  }

  return (
    <AuthContext.Provider value={{ utilisateur, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}