import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import Calendar from "../components/Calendar.jsx"
import { useWorkspaces } from "../workspaces/WorkspaceContext.jsx"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export default function CalendarPage() {
  const { onMenu } = useOutletContext()
  const todayDate = new Date()
  const [current, setCurrent] = useState({ year: todayDate.getFullYear(), month: todayDate.getMonth() })
  const [deadlines, setDeadlines] = useState([])
  const { selectedWorkspace } = useWorkspaces()

  useEffect(() => {
    if (!selectedWorkspace) return setDeadlines([])
    const loadDeadlines = async () => {
      const projectResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/getprojects/${selectedWorkspace.workspace_id}`, { credentials: "include" })
      const projectData = await projectResponse.json()
      const project = projectData.data?.[0]
      if (!project) return setDeadlines([])
      const statuses = ["to do", "In progress", "Done", "Approved"]
      const taskLists = await Promise.all(statuses.map(async (status) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tasks/gettasks/${project.project_id}/${encodeURIComponent(status)}`, { credentials: "include" })
        const data = await response.json()
        return data.result || []
      }))
      setDeadlines(taskLists.flat().filter((task) => task.due_date).map((task) => ({
        day: new Date(task.due_date).getDate(),
        due_date: task.due_date,
        label: task.task_name,
        accent: "#55917F",
      })))
    }
    loadDeadlines().catch(() => setDeadlines([]))
  }, [selectedWorkspace])

  const changeMonth = (delta) => {
    setCurrent((c) => {
      const d = new Date(c.year, c.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  return (
    <>
      <Topbar title="Calendar" subtitle="Deadlines for the selected workspace project" onMenu={onMenu} />

      <div className="cal-toolbar">
        <div className="cal-month">
          <h2>{MONTHS[current.month]} {current.year} </h2>
          <div className="cal-nav">
            <button className="icon-btn" onClick={() => changeMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <button className="icon-btn" onClick={() => changeMonth(1)} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      <Calendar
        year={current.year}
        month={current.month}
        deadlines={deadlines.filter((deadline) => {
          const date = new Date(deadline.due_date)
          return !Number.isNaN(date) && date.getFullYear() === current.year && date.getMonth() === current.month
        })}
        today={todayDate.getFullYear() === current.year && todayDate.getMonth() === current.month ? todayDate.getDate() : undefined}
      />
    </>
  )
}
