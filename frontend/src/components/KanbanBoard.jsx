import { Plus } from "lucide-react"
import TaskCard from "./TaskCard.jsx"
import { columns as defaultColumns, kanban as defaultKanban } from "../data/mockData.js"
import "../styles/kanban.css"

export default function KanbanBoard({ data = defaultKanban, columns = defaultColumns, compact = false }) {
  return (
    <div className={`kanban ${compact ? "kanban-compact" : ""}`}>
      {columns.map((col) => {
        const tasks = data[col.key] || []
        return (
          <section className="kanban-col" key={col.key}>
            <header className="kanban-col-head">
              <div className="kanban-col-title">
                <span className="kanban-dot" style={{ background: col.accent }} />
                {col.label}
                <span className="kanban-count">{tasks.length}</span>
              </div>
            </header>
            <div className="kanban-col-body">
              {tasks.map((t) => (
                <TaskCard key={t.id} task={t} category={col.label} />
              ))}
              {tasks.length === 0 && <div className="kanban-empty">No tasks</div>}
            </div>
          </section>
        )
      })}
    </div>
  )
}
