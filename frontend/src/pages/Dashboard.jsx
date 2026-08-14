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
      <Topbar title="Dashboard" subtitle="Welcome back, Amelia" onMenu={onMenu} />

      <div className="dash-heading">
        <div>
          <h2>Workspace overview</h2>
          <p className="muted">Track your team&apos;s progress across active projects.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={17} /> Add Workspace
        </button>
      </div>

      <div className="stat-grid">
        {stats.map((s) => (
          <StatCard key={s.id} stat={s} />
        ))}
      </div>

      <div className="dash-columns">
        <section className="section dash-board">
          <div className="section-head">
            <h2>Task Board</h2>
            <span className="muted">Sprint 24 · Aug 11 – Aug 25</span>
          </div>
          <KanbanBoard />
        </section>

        <aside className="section dash-deadlines">
          <div className="section-head">
            <h2>Deadlines</h2>
          </div>
          <div className="deadline-list">
            {featured.map((p) => (
              <div className="deadline-card card" key={p.id}>
                <div className="deadline-card-top">
                  <span className="deadline-name">{p.name}</span>
                  <AvatarStack names={p.members} max={3} />
                </div>
                <ProgressBar value={p.progress} label="Project progress" />
                <div className="deadline-meta muted">
                  <Clock size={14} /> {p.daysRemaining} days remaining
                </div>
              </div>
            ))}
          </div>
        </aside>
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
