import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus, Clock } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import StatCard from "../components/StatCard.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import Modal from "../components/Modal.jsx"
import { AvatarStack } from "../components/Avatar.jsx"
import { columns } from "../data/mockData.js"
import { useWorkspaces } from "../workspaces/WorkspaceContext.jsx"
import "../styles/dashboard.css"

export default function Dashboard() {
  const { onMenu } = useOutletContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState({ todo: [], progress: [], done: [], approved: [] })
  const { selectedWorkspace } = useWorkspaces()

  useEffect(() => {
    if (!selectedWorkspace) return
    const loadDashboard = async () => {
      const projectResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/getprojects/${selectedWorkspace.workspace_id}`, { credentials: "include" })
      const projectData = await projectResponse.json()
      if (!projectResponse.ok || !projectData.data?.[0]) return
      const currentProject = projectData.data[0]
      setProject(currentProject)
      const statuses = [["todo", "to do"], ["progress", "In progress"], ["done", "Done"], ["approved", "Approved"]]
      const results = await Promise.all(statuses.map(async ([key, status]) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/gettasks/${currentProject.project_id}/${encodeURIComponent(status)}`, { credentials: "include" })
        const data = await response.json()
        return [key, data.result || []]
      }))
      setTasks(Object.fromEntries(results))
    }
    loadDashboard().catch(() => setTasks({ todo: [], progress: [], done: [], approved: [] }))
  }, [selectedWorkspace])

  return (
    <>
      <Topbar subtitle={selectedWorkspace?.workspace_name || "No workspace selected"} title="Dashboard" onMenu={onMenu} />

      <div className="dash-heading">
        <div>
          <h2>{project?.project_name || "Project"}</h2>
        </div>
        
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Switch Project
        </button>
      </div>
      <ProgressBar value="0" label="Project Deadline" />
      <div className="deadline-meta muted">
        <Clock size={14} /> {project ? "Task deadlines are shown below" : "Select a workspace to view its projects"}
      </div>
      <div className="dash-heading2">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={17} /> Add task
        </button>
      </div>

      {/* <div className="stat-grid">
        {stats.map((s) => (
          <StatCard key={s.id} stat={s} />
        ))}
      </div> */}

      <div className="dash-columns">
        <section className="section dash-board">
          <KanbanBoard data={tasks} columns={columns} />
        </section>

      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create workspace"
        subtitle="Group related projects and teammates together."
      >
        <form
          className="auth-fields"
          onSubmit={(e) => {
            e.preventDefault()
            setModalOpen(false)
          }}
        >
          <div className="field">
            <label htmlFor="ws-name">Workspace name</label>
            <input id="ws-name" className="input" type="text" placeholder="e.g. Product Design" required />
          </div>
          <div className="field">
            <label htmlFor="ws-desc">Description</label>
            <textarea id="ws-desc" className="input" rows={3} placeholder="What is this workspace for?" />
          </div>
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
