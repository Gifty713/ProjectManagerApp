import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import Calendar from "../components/Calendar.jsx"
import { calendarDeadlines } from "../data/mockData.js"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const legend = [
  { label: "Website Redesign", accent: "#55917F" },
  { label: "Auth System", accent: "#38023B" },
  { label: "Design System", accent: "#6BAB90" },
  { label: "Mobile App v2", accent: "#2E382E" },
]

export default function CalendarPage() {
  const { onMenu } = useOutletContext()
  // Anchored on the mock data month.
  const [current, setCurrent] = useState({ year: 2026, month: 7 }) // August 2026

  const changeMonth = (delta) => {
    setCurrent((c) => {
      const d = new Date(c.year, c.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const isMockMonth = current.year === 2026 && current.month === 7

  const todayDate = new Date();
  const todayDay = todayDate.getDate();
  console.log(todayDay)
  return (
    <>
      <Topbar title="Calendar" subtitle="Project deadlines and milestones" onMenu={onMenu} />

      <div className="cal-toolbar">
        <div className="cal-month">
          <h2>{MONTHS[current.month]} {current.year} </h2>
          <div className="cal-nav">
            <button className="icon-btn" onClick={() => changeMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <button className="icon-btn" onClick={() => changeMonth(1)} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      <Calendar
        year={current.year}
        month={current.month}
        deadlines={isMockMonth ? calendarDeadlines : []}
        today={isMockMonth ? todayDay : undefined}
      />
    </>
  )
}
