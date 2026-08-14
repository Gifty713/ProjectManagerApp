import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus, Clock } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import StatCard from "../components/StatCard.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import Modal from "../components/Modal.jsx"
import { AvatarStack } from "../components/Avatar.jsx"
import { stats, projects } from "../data/mockData.js"
import "../styles/dashboard.css"

const featured = projects.filter((p) => p.status === "Active").slice(0, 3)

export default function Dashboard() {
  const { onMenu } = useOutletContext()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Topbar subtitle="This is workspace this" onMenu={onMenu} />

      <div className="dash-heading">
        <div>
          <h2>Project</h2>
        </div>
        
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Switch Project
        </button>
      </div>
      <ProgressBar value="40" label="Project Deadline" />
      <div className="deadline-meta muted">
        <Clock size={14} /> 10 days remaining
      </div>
      <div className="dash-heading2">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={17} /> Add task
        </button>
      </div>

      {/* <div className="stat-grid">
        {stats.map((s) => (
          <StatCard key={s.id} stat={s} />
        ))}
      </div> */}

      <div className="dash-columns">
        <section className="section dash-board">
          <KanbanBoard />
        </section>

      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create workspace"
        subtitle="Group related projects and teammates together."
      >
        <form
          className="auth-fields"
          onSubmit={(e) => {
            e.preventDefault()
            setModalOpen(false)
          }}
        >
          <div className="field">
            <label htmlFor="ws-name">Workspace name</label>
            <input id="ws-name" className="input" type="text" placeholder="e.g. Product Design" required />
          </div>
          <div className="field">
            <label htmlFor="ws-desc">Description</label>
            <textarea id="ws-desc" className="input" rows={3} placeholder="What is this workspace for?" />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Workspace
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
