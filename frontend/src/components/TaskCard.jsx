import { CalendarClock, Flag } from "lucide-react"
import Avatar from "./Avatar.jsx"

const prioLabel = { high: "High", medium: "Medium", low: "Low" }

export default function TaskCard({ task, category }) {
  return (
    <article className="task-card">
      {/* <div className="task-card-head">
        <span className={`prio prio-${task.priority}`}>
          <Flag size={13} /> {prioLabel[task.priority]}
        </span>
        <Avatar name={task.assignee} size="sm" />
      </div> */}
      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      <div className="task-card-foot">
        {category === "To Do" ? (<button className="btn btn-primary"> Start</button>) 
        : category === "In Progress" 
        ? (<button className="btn btn-primary"> Done</button>) 
        : category === "Done"
        ? (<div><button className="btn btn-primary"> Allow</button> <button className="btn btn-primary"> Deny</button></div>)
        : ("")
        }
        <span className="task-deadline muted">
        <CalendarClock size={14} /> {task.deadline}
        </span>
        <span className="task-assignee muted">{task.assignee}</span>
      </div>
     
    </article>
  )
}
