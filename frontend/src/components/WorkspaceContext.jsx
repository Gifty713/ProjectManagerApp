import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useAuth } from "../auth/AuthContext.jsx"

const WorkspaceContext = createContext(null)
const apiUrl = import.meta.env.VITE_API_URL

export function WorkspaceProvider({ children }) {
  const { isAuthenticated } = useAuth()
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
      const savedIndex = Number.parseInt(localStorage.getItem("selectedWorkspaceIndex"), 10)
      const savedWorkspace = Number.isInteger(savedIndex) ? items[savedIndex] : null
      setWorkspaces(items)
      setSelectedWorkspace((current) => items.find((workspace) => workspace.workspace_id === current?.workspace_id) || savedWorkspace || items[0] || null)
    } catch {
      setWorkspaces([])
      setSelectedWorkspace(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      loadWorkspaces()
    } else if (isAuthenticated === false) {
      setWorkspaces([])
      setSelectedWorkspace(null)
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    const index = workspaces.findIndex((workspace) => workspace.workspace_id === selectedWorkspace?.workspace_id)
    if (index >= 0) localStorage.setItem("selectedWorkspaceIndex", String(index))
  }, [workspaces, selectedWorkspace])

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
