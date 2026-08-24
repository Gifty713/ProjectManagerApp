import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import Modal from "../components/Modal.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { useWorkspaces } from "../components/WorkspaceContext.jsx"
import { useProjects } from "../components/ProjectContext.jsx"
import "../styles/projects.css"


export default function Projects() {
  const { onMenu } = useOutletContext()
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("")
  const [error, setError] = useState("")
  const [currentRole, setCurrentRole] = useState(null)
  const { selectedWorkspace } = useWorkspaces()
  const { projects, setProjects, selectedProject, setSelectedProject } = useProjects()
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedProject) {
      setCurrentRole(null)
      return
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/members/getmembers/${selectedProject.project_id}`, { credentials: "include" })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message)
        setCurrentRole(data.current_role || null)
      })
      .catch(() => setCurrentRole(null))
  }, [selectedProject])

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
      setSelectedProject(data.result)
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
          <button className="btn btn-primary switch" onClick={() => navigate("/workspaces")}>
            Switch Workspace
          </button>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)} disabled={currentRole === "Team Manager"}>
            <Plus size={17} /> New Project
          </button>
        </div>

      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.project_id} project={p} who={"projects"} currentProject={selectedProject?.project_id} setCurrentProject={(projectId) => setSelectedProject(projects.find((project) => project.project_id === projectId) || null)} />
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
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
