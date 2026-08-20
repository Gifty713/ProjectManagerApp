import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import Modal from "../components/Modal.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { useWorkspaces } from "../workspaces/WorkspaceContext.jsx"
import "../styles/projects.css"


export default function Projects() {
  const { onMenu } = useOutletContext()
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState("")
  const [error, setError] = useState("")
  const { workspaces, selectedWorkspace, setSelectedWorkspace } = useWorkspaces()

  useEffect(() => {
    if (!selectedWorkspace) return setProjects([])
    const loadProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/getprojects/${selectedWorkspace.workspace_id}`, { credentials: "include" })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Unable to load projects.")
        setProjects(data.data || [])
      } catch (err) {
        setError(err.message)
      }
    }
    loadProjects()
  }, [selectedWorkspace])

  const createProject = async (e) => {
    e.preventDefault()
    if (!selectedWorkspace) return
    setError("")
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/createproject/${selectedWorkspace.workspace_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ project_name: projectName }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Unable to create project.")
      setProjects((current) => [...current, data.result])
      setProjectName("")
      setModalOpen(false)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Topbar title={selectedWorkspace?.workspace_name || "Projects"} subtitle={`${projects.length} projects in this workspace`} onMenu={onMenu} />

      <div className="projects-toolbar">
        <div className="filter-chips" role="tablist" aria-label="Filter projects">  
        </div>
        <div className="projects-toolbar">
          <select className="input" value={selectedWorkspace?.workspace_id || ""} onChange={(e) => setSelectedWorkspace(workspaces.find((workspace) => String(workspace.workspace_id) === e.target.value) || null)}>
            <option value="">Select workspace</option>
            {workspaces.map((workspace) => <option key={workspace.workspace_id} value={workspace.workspace_id}>{workspace.workspace_name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={17} /> New Project
          </button>
        </div>

      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} who={"projects"} />
        ))}
      </div>
      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create project"
        subtitle="Add a project to the selected workspace."
      >
        <form
          className="auth-fields"
          onSubmit={createProject}
        >
          <div className="field">
            <label htmlFor="project-name">Project name</label>
            <input id="project-name" className="input" type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
          </div>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Workspace
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
