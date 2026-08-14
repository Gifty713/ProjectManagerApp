import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  Boxes,
  Settings,
  ChevronRight,
  X,
} from "lucide-react"
import Avatar from "./Avatar.jsx"
import { currentUser } from "../data/mockData.js"
import "../styles/sidebar.css"

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/workspaces", label: "Workspaces", icon: Boxes },
]

export default function Sidebar({ open, onClose }) {
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
          <button className="user-chip" type="button">
            <Avatar name={currentUser.name} size="md" />
            <span className="user-meta">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">{currentUser.role}</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
