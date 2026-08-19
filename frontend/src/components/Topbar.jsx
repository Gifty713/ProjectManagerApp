import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, Search, CalendarDays, Bell } from "lucide-react"
import Avatar from "./Avatar.jsx"
import { currentUser, notifications } from "../data/mockData.js"
import "../styles/topbar.css"

export default function Topbar({ title, subtitle, onMenu }) {
  const [showNotif, setShowNotif] = useState(false)
  const navigate = useNavigate()
  const unread = notifications.filter((n) => n.unread).length

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="topbar-title">
          <h1>{title}</h1>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" aria-label="Calendar" onClick={() => navigate("/calendar")}>
          <CalendarDays size={19} />
        </button>

        <div className="notif-wrap">
          <button
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => setShowNotif((s) => !s)}
          >
            <Bell size={19} />
            {unread > 0 && <span className="notif-count">{unread}</span>}
          </button>
          {showNotif && (
            <>
              <div className="notif-backdrop" onClick={() => setShowNotif(false)} />
              <div className="notif-panel card" role="menu">
                <div className="notif-panel-head">Notifications</div>
                {notifications.map((n) => (
                  <div key={n.id} className={`notif-row ${n.unread ? "unread" : ""}`}>
                    {n.unread && <span className="notif-dot" />}
                    <div>
                      <p>{n.text}</p>
                      <span className="muted">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="topbar-avatar" aria-label="Account">
          <Avatar name={currentUser.name} size="md" />
        </div>
      </div>
    </header>
  )
}
