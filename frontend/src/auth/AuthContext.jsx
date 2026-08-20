import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/session`, { credentials: "include" })
      .then((response) => setIsAuthenticated(response.ok))
      .catch(() => setIsAuthenticated(false))
  }, [])

  const value = useMemo(() => ({
    isAuthenticated,
    signIn: () => setIsAuthenticated(true),
    signOut: () => setIsAuthenticated(false),
  }), [isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = useContext(AuthContext)

  if (!auth) throw new Error("useAuth must be used within an AuthProvider")

  return auth
}
