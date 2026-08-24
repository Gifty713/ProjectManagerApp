import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Plus, Clock, CalendarDays } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import StatCard from "../components/StatCard.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import Modal from "../components/Modal.jsx"
import { AvatarStack } from "../components/Avatar.jsx"
import { columns } from "../data/mockData.js"
import { useWorkspaces } from "../components/WorkspaceContext.jsx"
import { useProjects } from "../components/ProjectContext.jsx"
import "../styles/dashboard.css"

export default function Dashboard() {
  const { onMenu } = useOutletContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState({ todo: [], progress: [], done: [], approved: [] })
  const [members, setMembers] = useState([])
  const [currentRole, setCurrentRole] = useState(null)
  const [taskName, setTaskName] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedWorkspace } = useWorkspaces()
  const { selectedProject: project } = useProjects()
  const navigate = useNavigate()

  const loadDashboard = async () => {
    if (!project) {
      setTasks({ todo: [], progress: [], done: [], approved: [] })
      return
    }
    const statuses = [["todo", "to do"], ["progress", "In progress"], ["done", "Done"], ["approved", "Approved"]]
    const results = await Promise.all(statuses.map(async ([key, status]) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/gettasks/${project.project_id}/${encodeURIComponent(status)}`, { credentials: "include" })
      const data = await response.json()
      return [key, data.result || []]
    }))
    setTasks(Object.fromEntries(results))
  }

  useEffect(() => {
    loadDashboard().catch(() => setTasks({ todo: [], progress: [], done: [], approved: [] }))
  }, [project])

  useEffect(() => {
    if (!project) {
      setMembers([])
      setCurrentRole(null)
      setAssignedTo("")
      return
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/members/getmembers/${project.project_id}`, { credentials: "include" })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Unable to load project members.")
        setMembers(data.user_ids || [])
        setCurrentRole(data.current_role || null)
      })
      .catch(() => {
        setMembers([])
        setCurrentRole(null)
      })
    setAssignedTo("")
  }, [project])

  const createTask = async (event) => {
    event.preventDefault()
    if (!project) return
    setError("")
    setIsSubmitting(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/createtask/${project.project_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ task_name: taskName, due_date: dueDate, assigned_to: assignedTo }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Unable to create task.")
      await loadDashboard()
      setTaskName("")
      setDueDate("")
      setAssignedTo("")
      setModalOpen(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Topbar subtitle={`Current Workspace: ${selectedWorkspace?.workspace_name}`} title="Dashboard" onMenu={onMenu} />

      <div className="dash-heading">
        <div>
          <h2>{project?.project_name || "Project"}</h2>
        </div>
        
        <button className="btn btn-primary" onClick={() => navigate("/projects")}>
          Switch Project
        </button>
      </div>
      <ProgressBar value="0" label="Project Deadline" />
      <div className="deadline-meta muted">
        <Clock size={14} /> {project ? "Task deadlines are shown below" : "Select a workspace to view its projects"}
      </div>
      <div className="dash-heading2">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)} disabled={!project || currentRole === "Team Member"}>
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
        title="Create task"
        subtitle="Add a task for the selected project."
      >
        <form
          className="auth-fields"
          onSubmit={createTask}
        >
          <div className="field">
            <label htmlFor="task-name">Task name</label>
            <input id="task-name" className="input" type="text" value={taskName} onChange={(event) => setTaskName(event.target.value)} placeholder="e.g. API documentation" required />
          </div>
          <div className="field">
            <label htmlFor="task-due-date">Due date</label>
            <div className="input-wrap">
              <CalendarDays className="lead-icon" size={17} />
              <input id="task-due-date" className="input has-lead" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="task-assignee">Assigned to</label>
            <select id="task-assignee" className="input" value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)} required>
              <option value="">Select a project member</option>
              {members.map((member) => (
                <option key={member.user_id} value={member.user_id}>
                  {`${member.first_name} ${member.last_name}`.trim() || member.email}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting || !members.length}>
              Create task
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
