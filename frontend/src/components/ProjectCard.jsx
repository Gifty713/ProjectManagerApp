import { Link } from "react-router-dom"
import { Clock, ListChecks, Users } from "lucide-react"
import { AvatarStack } from "./Avatar.jsx"


export default function ProjectCard({ project, who, currentWorkspace, setCurrentWorkspace}) {
  const id = project.project_id || project.workspace_id || project.id
  const name = project.project_name || project.workspace_name || project.name
  const members = project.members || []
  const isCurrentWorkspace = currentWorkspace === id
  const wsClick =()=>{
    setCurrentWorkspace(id);
  }
  return (
    <div>
    {who ==="projects"?
    <Link to={`/projects/${id}`} className="project-card card">
      <h3 className="project-name">{name}</h3>

      <div className="project-meta">
        <span className="project-meta-item">
          <Clock size={14} />
          {project.daysRemaining > 0 ? `${project.daysRemaining}d left` : "No deadline"}
        </span>
        <span className="project-meta-item">
          <ListChecks size={14} /> {project.tasks ?? 0} tasks
        </span>
        <span className="project-meta-item">
          <Users size={14} /> {members.length} members
        </span>
      </div>

      <div className="project-card-foot">
        <AvatarStack names={members} max={4} />
        <span className="project-view">View project →</span>
      </div>
    </Link> :
    <div className="project-card card" onClick={wsClick}>
      <h3 className="project-name">{name}</h3>

      <div className="project-card-foot">
        <span className="workspace-view">
          {isCurrentWorkspace
            ? "Current workspace"
            : "Switch to workspace"
          }
        </span>
      </div>      
    </div>
  }
    </div>

  )
}
