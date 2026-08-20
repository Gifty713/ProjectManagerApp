import { createContext, useContext, useEffect, useMemo, useState } from "react"

const WorkspaceContext = createContext(null)
const apiUrl = import.meta.env.VITE_API_URL

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([])
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadWorkspaces = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/v1/workspace/getworkspaces`, { credentials: "include" })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Unable to load workspaces.")
      const items = data.data || []
      setWorkspaces(items)
      setSelectedWorkspace((current) => current || items[0] || null)
    } catch {
      setWorkspaces([])
      setSelectedWorkspace(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadWorkspaces() }, [])

  const value = useMemo(() => ({
    workspaces,
    selectedWorkspace,
    setSelectedWorkspace,
    loading,
    loadWorkspaces,
  }), [workspaces, selectedWorkspace, loading])

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspaces() {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error("useWorkspaces must be used within a WorkspaceProvider")
  return context
}
