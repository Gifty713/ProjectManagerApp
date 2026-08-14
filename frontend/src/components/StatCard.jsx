import { Boxes, FolderKanban, ListChecks, CheckCircle2 } from "lucide-react"

const icons = {
  ws: Boxes,
  pr: FolderKanban,
  at: ListChecks,
  ct: CheckCircle2,
}

export default function StatCard({ stat }) {
  const Icon = icons[stat.id] || Boxes
  return (
    <div className="stat-card card">
      <div className="stat-card-top">
        <span className="stat-ic" style={{ background: `${stat.accent}14`, color: stat.accent }}>
          <Icon size={20} />
        </span>
        <span className="stat-strip" style={{ background: stat.accent }} />
      </div>
      <div className="stat-value">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-hint muted">{stat.hint}</div>
    </div>
  )
}
