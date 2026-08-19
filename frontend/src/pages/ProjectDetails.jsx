import { useOutletContext, useParams, Link } from "react-router-dom"
import { Clock, ArrowLeft } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import CommentSection from "../components/CommentSection.jsx"
import Avatar from "../components/Avatar.jsx"
import { projects } from "../data/mockData.js"
import "../styles/project-details.css"

export default function ProjectDetails() {
  const { onMenu } = useOutletContext()
  const { projectId } = useParams()
  const project = projects.find((p) => p.id === projectId) || projects[0]

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
          </div>
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
