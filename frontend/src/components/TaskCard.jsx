import { CalendarClock, Flag } from "lucide-react"
import Avatar from "./Avatar.jsx"

const prioLabel = { high: "High", medium: "Medium", low: "Low" }

export default function TaskCard({ task, category }) {
  const title = task.task_name || task.title
  const deadline = task.due_date ? new Date(task.due_date).toLocaleDateString() : task.deadline
  const assignee = task.assigned_to || task.assignee
  return (
    <article className="task-card">
      {/* <div className="task-card-head">
        <span className={`prio prio-${task.priority}`}>
          <Flag size={13} /> {prioLabel[task.priority]}
        </span>
        <Avatar name={task.assignee} size="sm" />
      </div> */}
      <h4 className="task-title">{title}</h4>
      <div className="task-card-foot">
        {category === "To Do" ? (<button className="btn btn-primary"> Start</button>) 
        : category === "In Progress" 
        ? (<button className="btn btn-primary"> Done</button>) 
        : category === "Done"
        ? (<div><button className="btn btn-primary"> Allow</button> <button className="btn btn-primary"> Deny</button></div>)
        : ("")
        }
        <span className="task-deadline muted">
        <CalendarClock size={14} /> {deadline}
        </span>
        <span className="task-assignee muted">{assignee}</span>
      </div>
     
    </article>
  )
}
