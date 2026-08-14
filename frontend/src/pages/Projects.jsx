import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { projects } from "../data/mockData.js"
import "../styles/projects.css"

const filters = ["All", "Active", "Planning", "On Hold", "Completed"]

export default function Projects() {
  const { onMenu } = useOutletContext()
  const [filter, setFilter] = useState("All")

  const visible = filter === "All" ? projects : projects.filter((p) => p.status === filter)

  return (
    <>
      <Topbar title="Projects" subtitle={`${projects.length} projects in your workspaces`} onMenu={onMenu} />

      <div className="projects-toolbar">
        <div className="filter-chips" role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "chip-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="btn btn-primary">
          <Plus size={17} /> New Project
        </button>
      </div>

      <div className="projects-grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </>
  )
}
