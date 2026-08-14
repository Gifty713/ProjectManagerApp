import { colorFor, initials } from "../data/mockData.js"

export default function Avatar({ name, size = "md" }) {
  return (
    <span
      className={`avatar avatar-${size}`}
      style={{ background: colorFor(name) }}
      title={name}
      aria-label={name}
    >
      {initials(name)}
    </span>
  )
}

export function AvatarStack({ names = [], max = 4, size = "sm" }) {
  const shown = names.slice(0, max)
  const extra = names.length - shown.length
  return (
    <div className="avatar-stack">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} />
      ))}
      {extra > 0 && (
        <span className={`avatar avatar-${size} avatar-more`} aria-label={`${extra} more members`}>
          +{extra}
        </span>
      )}
    </div>
  )
}
