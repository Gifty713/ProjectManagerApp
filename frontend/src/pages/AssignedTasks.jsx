import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import AssignedTaskCard from "../components/AssignedTaskCard.jsx"
import { useWorkspaces } from "../workspaces/WorkspaceContext.jsx"
import "../styles/projects.css"

export default function AssignedTasks (){
    const { onMenu } = useOutletContext()

    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const { selectedWorkspace } = useWorkspaces()

    useEffect(() => {
      if (!selectedWorkspace) return setTasks([])
      const loadTasks = async () => {
        const projectResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/getprojects/${selectedWorkspace.workspace_id}`, { credentials: "include" })
        const projectData = await projectResponse.json()
        const currentProject = projectData.data?.[0]
        if (!currentProject) return setTasks([])
        setProject(currentProject)
        const statuses = ["to do", "In progress", "Done", "Approved"]
        const responses = await Promise.all(statuses.map(async (status) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/gettasks/${currentProject.project_id}/${encodeURIComponent(status)}`, { credentials: "include" })
          const data = await response.json()
          return data.result || []
        }))
        setTasks(responses.flat())
      }
      loadTasks().catch(() => setTasks([]))
    }, [selectedWorkspace])
    return(
    <>
      <Topbar title="Project tasks" subtitle="Tasks from the selected workspace project" onMenu={onMenu} />

      <div className="projects-toolbar">  
      </div>

      <div className="projects-grid">
        {tasks.map((task) => (
          <AssignedTaskCard key={task.task_id} task={task} projectName={project?.project_name || "Project"}/>
        ))}
      </div>
    </>
    )
}
