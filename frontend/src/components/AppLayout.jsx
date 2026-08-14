import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar.jsx"
import "../styles/layout.css"

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={closeMenu} />
      <main className="app-main">
        <div className="app-container">
          <Outlet context={{ onMenu: openMenu }} />
        </div>
      </main>
    </div>
  )
}
