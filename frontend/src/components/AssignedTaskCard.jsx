import { Link } from "react-router-dom"
import { Clock, ListChecks, Users, CircleCheck  } from "lucide-react"
import ProgressBar from "./ProgressBar.jsx"
import { AvatarStack } from "./Avatar.jsx"
import { useState } from "react"

export default function AssignedTaskCard({ task, projectName }) {
  const [isTaskDone, setIsTaskDone] = useState(false);

  const taskClick = () => {
    setIsTaskDone((prev) => !prev);
  };

  return (
    <div className="project-card card" onClick={taskClick}>
      <h3 className="project-name">{task.task_name}</h3>

      <div className="task-meta">
        <span className="project-meta-item">
          <Users size={14} /> {task.assigned_to}
        </span>

        <span className="project-meta-item">
          <ListChecks size={14} /> {projectName}
        </span>
      </div>

      <div className="project-card-foot">
        <span className="project-meta-item">
          <Clock size={14} />
          {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No deadline"}
        </span>

        <span className="workspace-view">
          {!isTaskDone ? (
            "Task Completed"
          ) : (
            <div className="task-circle">
              <CircleCheck size={14} />
              not done?
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
