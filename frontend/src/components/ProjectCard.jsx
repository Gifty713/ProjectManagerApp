import { Link } from "react-router-dom"
import { Clock, ListChecks, Users } from "lucide-react"
import ProgressBar from "./ProgressBar.jsx"
import { AvatarStack } from "./Avatar.jsx"

const statusClass = {
  Active: "badge-active",
  Planning: "badge-planning",
  "On Hold": "badge-hold",
  Completed: "badge-done",
}

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="project-card card">
      <div className="project-card-head">
        <span className={`badge ${statusClass[project.status] || "badge-planning"}`}>
          <span className="badge-dot" /> {project.status}
        </span>
        {project.hasNotification && (
          <span className="notif-dot" aria-label="New activity" title="New activity" />
        )}
      </div>

      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-progress">
        <ProgressBar value={project.progress} showPct label="Progress" />
      </div>

      <div className="project-meta">
        <span className="project-meta-item">
          <Clock size={14} />
          {project.daysRemaining > 0 ? `${project.daysRemaining}d left` : "Delivered"}
        </span>
        <span className="project-meta-item">
          <ListChecks size={14} /> {project.tasks} tasks
        </span>
        <span className="project-meta-item">
          <Users size={14} /> {project.members.length} members
        </span>
      </div>

      <div className="project-card-foot">
        <AvatarStack names={project.members} max={4} />
        <span className="project-view">View project →</span>
      </div>
    </Link>
  )
}
