import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { projects } from "../data/mockData.js"
import "../styles/projects.css"


export default function Workspaces() {
  const { onMenu } = useOutletContext()

  const visible = projects;
  const [wsClicked, setWsClicked] = useState(false);
  return (
    <>
      <Topbar title="Explore Workspaces" subtitle={`${projects.length} workspaces you are in.`} onMenu={onMenu} />

      <div className="projects-toolbar">
        <div className="filter-chips" role="tablist" aria-label="Filter projects">  
        </div>
        <div className="projects-toolbar">
          <button className="btn btn-primary">
          <Plus size={17} /> Add Workspace
          </button>  
          <button className="btn btn-primary">
          <Plus size={17} /> New Workspace
          </button>  
        </div>     
      </div>

      <div className="projects-grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} who={"workspaces"} currentWorkspace={wsClicked} setCurrentWorkspace={setWsClicked}/>
        ))}
      </div>
    </>
  )
}
