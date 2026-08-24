import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useWorkspaces } from "./WorkspaceContext.jsx"

const ProjectContext = createContext(null)

export function ProjectProvider({ children }) {
  const { selectedWorkspace } = useWorkspaces()
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  const loadProjects = async () => {
    if (!selectedWorkspace) {
      setProjects([])
      setSelectedProject(null)
      return
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/getprojects/${selectedWorkspace.workspace_id}`, { credentials: "include" })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Unable to load projects.")
    const items = data.data || []
    setProjects(items)
    setSelectedProject((current) => items.find((project) => project.project_id === current?.project_id) || items[0] || null)
  }

  useEffect(() => {
    loadProjects().catch(() => {
      setProjects([])
      setSelectedProject(null)
    })
  }, [selectedWorkspace])

  const value = useMemo(() => ({ projects, setProjects, selectedProject, setSelectedProject, loadProjects }), [projects, selectedProject])
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (!context) throw new Error("useProjects must be used within a ProjectProvider")
  return context
}
