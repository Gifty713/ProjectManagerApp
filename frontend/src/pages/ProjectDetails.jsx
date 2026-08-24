import { useEffect, useState } from "react"
import { useOutletContext, useParams, Link } from "react-router-dom"
import { Clock, ArrowLeft } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import CommentSection from "../components/CommentSection.jsx"
import Avatar from "../components/Avatar.jsx"
import { columns } from "../data/mockData.js"
import "../styles/project-details.css"

export default function ProjectDetails() {
  const { onMenu } = useOutletContext()
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState({ todo: [], progress: [], done: [], approved: [] })
  const [members, setMembers] = useState([])

  useEffect(() => {
    const loadProject = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/getparticularproject/${projectId}`, { credentials: "include" })
      const data = await response.json()
      if (!response.ok) return
      setProject(data.result)
      const memberResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/members/getmembers/${projectId}`, { credentials: "include" })
      const memberData = await memberResponse.json()
      if (memberResponse.ok) setMembers(memberData.user_ids || [])
      const statuses = [["todo", "to do"], ["progress", "In progress"], ["done", "Done"], ["approved", "Approved"]]
      const results = await Promise.all(statuses.map(async ([key, status]) => {
        const taskResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/gettasks/${projectId}/${encodeURIComponent(status)}`, { credentials: "include" })
        const taskData = await taskResponse.json()
        return [key, taskData.result || []]
      }))
      setTasks(Object.fromEntries(results))
    }
    loadProject().catch(() => setTasks({ todo: [], progress: [], done: [], approved: [] }))
  }, [projectId])

  return (
    <>
      <Topbar title="Project" subtitle="Detailed workspace" onMenu={onMenu} />

      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <header className="pd-header card">
        <div className="pd-header-main">
          <div className="pd-title-row">
            <h2>{project?.project_name || "Project"}</h2>
          </div>
          <div className="pd-facts">
            <span className="pd-fact">
              <Clock size={15} />
              Task deadlines are shown below
            </span>
            <span className="pd-fact">{Object.values(tasks).flat().length} tasks</span>
          </div>
          <div className="pd-member-roles">
            {members.map((member) => {
              const name = `${member.first_name} ${member.last_name}`.trim() || member.email
              return <span className="pd-member-role" key={member.user_id}>{name} · {member.role}</span>
            })}
          </div>
        </div>
        <div className="pd-progress-box">
          <div className="pd-team">
            <span className="pd-team-label muted">Team</span>
            <div className="pd-team-avatars">
              {members.map((member) => {
                const name = `${member.first_name} ${member.last_name}`.trim() || member.email
                return <Avatar key={member.user_id} name={name} size="sm" />
              })}
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <h2>Task Preview</h2>
          <span className="muted">Live board snapshot</span>
        </div>
        <KanbanBoard data={tasks} columns={columns} compact />
      </section>

      <section className="section">
        <CommentSection />
      </section>
    </>
  )
}
