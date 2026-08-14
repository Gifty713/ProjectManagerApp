import { createContext, useContext, useMemo, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)

  const value = useMemo(() => ({
    isAuthenticated: Boolean(accessToken),
    signIn: (token) => setAccessToken(token),
    signOut: () => setAccessToken(null),
  }), [accessToken])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = useContext(AuthContext)

  if (!auth) throw new Error("useAuth must be used within an AuthProvider")

  return auth
}
