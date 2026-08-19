import { Link } from "react-router-dom"
import { Clock, ListChecks, Users } from "lucide-react"
import ProgressBar from "./ProgressBar.jsx"
import { AvatarStack } from "./Avatar.jsx"
import { useState } from "react"


export default function ProjectCard({ project, who, currentWorkspace, setCurrentWorkspace}) {
  const isCurrentWorkspace = currentWorkspace === project.id;  
  const wsClick =()=>{
    setCurrentWorkspace(project.id);
  }
  return (
    <div>
    {who ==="projects"?
    <Link to={`/projects/${project.id}`} className="project-card card">
      <h3 className="project-name">{project.name}</h3>

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
    </Link> :
    <div className="project-card card" onClick={wsClick}>
      <h3 className="project-name">{project.name}</h3>

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
