import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  Boxes,
  Settings,
  ChevronRight,
  X,
  ListTodo 
} from "lucide-react"
import Avatar from "./Avatar.jsx"
import { useAuth } from "../auth/AuthContext.jsx"
import "../styles/sidebar.css"

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/workspaces", label: "Workspaces", icon: Boxes },
  { to: "/assignedtasks", label: "Assigned tasks", icon: ListTodo },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
]

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()
  const name = `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || user?.email || "Account"

  return (
    <>
      <div className={`sidebar-scrim ${open ? "show" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand">
            <span className="brand-mark">N</span>
            <span className="brand-name">Nexus</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-label">Menu</div>
        <nav className="sidebar-nav">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={19} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="user-chip">
            <Avatar name={name} size="md" />
            <span className="user-meta">
              <span className="user-name">{name}</span>
              <span className="user-role">Signed in</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}
