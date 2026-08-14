export default function ProgressBar({ value = 0, label, showPct = true, color }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="progress">
      {/* {(label || showPct) && (
        <div className="progress-head">
          {label && <span className="muted" style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>}
          {showPct && <span className="pct">{clamped}%</span>}
        </div>
      )} */}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-fill"
          style={{ width: `${clamped}%`, background: color || undefined }}
        />
      </div>
    </div>
  )
}
