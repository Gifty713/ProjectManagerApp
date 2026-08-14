import { useMemo } from "react"
import "../styles/calendar.css"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function Calendar({ year, month, deadlines = [], today }) {
  // month is 0-indexed
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    // Convert JS Sunday-first (0=Sun) to Monday-first index
    const startOffset = (firstDay.getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const list = []
    for (let i = 0; i < startOffset; i++) list.push(null)
    for (let d = 1; d <= daysInMonth; d++) list.push(d)
    while (list.length % 7 !== 0) list.push(null)
    return list
  }, [year, month])

  const byDay = useMemo(() => {
    const map = {}
    for (const d of deadlines) {
      map[d.day] = map[d.day] || []
      map[d.day].push(d)
    }
    return map
  }, [deadlines])

  return (
    <div className="cal-grid card">
      <div className="cal-weekdays">
        {WEEKDAYS.map((w) => (
          <div className="cal-weekday" key={w}>{w}</div>
        ))}
      </div>
      <div className="cal-days">
        {cells.map((day, i) => {
          if (day === null) return <div className="cal-cell empty" key={`e${i}`} />
          const events = byDay[day] || []
          const isToday = day === today
          return (
            <div className={`cal-cell ${isToday ? "is-today" : ""}`} key={day}>
              <span className="cal-date">{day}</span>
              {events.length > 0 && (
                <div className="cal-events">
                  {events.map((ev, idx) => (
                    <span className="cal-event" key={idx} style={{ borderColor: ev.accent }}>
                      <span className="cal-event-dot" style={{ background: ev.accent }} />
                      {ev.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
