import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setUser] = useState(null)
  const sessionRequest = useRef(0)

  useEffect(() => {
    const requestId = ++sessionRequest.current
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/session`, { credentials: "include" })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}))
        if (requestId === sessionRequest.current) {
          setIsAuthenticated(response.ok)
          setUser(response.ok ? data.user || null : null)
        }
      })
      .catch(() => {
        if (requestId === sessionRequest.current) {
          setIsAuthenticated(false)
          setUser(null)
        }
      })
  }, [])

  const value = useMemo(() => ({
    isAuthenticated,
    signIn: async () => {
      const requestId = ++sessionRequest.current
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/session`, { credentials: "include" })
      const data = await response.json().catch(() => ({}))
      if (requestId === sessionRequest.current) {
        setIsAuthenticated(response.ok)
        setUser(response.ok ? data.user || null : null)
      }
      return response.ok
    },
    signOut: () => {
      sessionRequest.current += 1
      setIsAuthenticated(false)
      setUser(null)
    },
    user,
  }), [isAuthenticated, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = useContext(AuthContext)

  if (!auth) throw new Error("useAuth must be used within an AuthProvider")

  return auth
}
