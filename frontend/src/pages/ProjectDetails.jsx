import { useOutletContext, useParams, Link } from "react-router-dom"
import { Clock, ArrowLeft } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import CommentSection from "../components/CommentSection.jsx"
import Avatar from "../components/Avatar.jsx"
import { projects } from "../data/mockData.js"
import "../styles/project-details.css"

const statusClass = {
  Active: "badge-active",
  Planning: "badge-planning",
  "On Hold": "badge-hold",
  Completed: "badge-done",
}

export default function ProjectDetails() {
  const { onMenu } = useOutletContext()
  const { projectId } = useParams()
  const project = projects.find((p) => p.id === projectId) || projects[0]

  const summary = [
    { label: "Total Tasks", value: project.counts.total, accent: "#2E382E" },
    { label: "To Do", value: project.counts.todo, accent: "#9a99a8" },
    { label: "In Progress", value: project.counts.progress, accent: "#38023B" },
    { label: "Done", value: project.counts.done, accent: "#6BAB90" },
    { label: "Approved", value: project.counts.approved, accent: "#55917F" },
  ]

  return (
    <>
      <Topbar title="Project" subtitle="Detailed workspace" onMenu={onMenu} />

      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <header className="pd-header card">
        <div className="pd-header-main">
          <div className="pd-title-row">
            <h2>{project.name}</h2>
            <span className={`badge ${statusClass[project.status]}`}>
              <span className="badge-dot" /> {project.status}
            </span>
          </div>
          <p className="pd-desc muted">{project.description}</p>
          <div className="pd-facts">
            <span className="pd-fact">
              <Clock size={15} />
              {project.daysRemaining > 0 ? `${project.daysRemaining} days remaining` : "Delivered"}
            </span>
            <span className="pd-fact">{project.tasks} tasks</span>
            <span className="pd-fact">{project.members.length} members</span>
          </div>
        </div>
        <div className="pd-progress-box">
          <ProgressBar value={project.progress} label="Overall progress" />
          <div className="pd-team">
            <span className="pd-team-label muted">Team</span>
            <div className="pd-team-avatars">
              {project.members.map((m) => (
                <div className="pd-team-member" key={m}>
                  <Avatar name={m} size="md" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="pd-summary">
        {summary.map((s) => (
          <div className="pd-summary-card card" key={s.label}>
            <span className="pd-summary-value" style={{ color: s.accent }}>{s.value}</span>
            <span className="pd-summary-label muted">{s.label}</span>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Task Preview</h2>
          <span className="muted">Live board snapshot</span>
        </div>
        <KanbanBoard compact />
      </section>

      <section className="section">
        <CommentSection />
      </section>
    </>
  )
}
