import { useState } from "react"
import { Send } from "lucide-react"
import Avatar from "./Avatar.jsx"
import { comments as initialComments, currentUser } from "../data/mockData.js"
import "../styles/comments.css"

export default function CommentSection() {
  // Local UI state only — ready to be swapped for an API call later.
  const [comments, setComments] = useState(initialComments)
  const [draft, setDraft] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    setComments((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, author: currentUser.name, text, time },
    ])
    setDraft("")
  }

  return (
    <section className="comments card">
      <div className="comments-head">
        <h3>Project Discussion</h3>
      </div>

      <div className="comments-list">
        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <Avatar name={c.author} size="md" />
            <div className="comment-body">
              <div className="comment-meta">
                <span className="comment-author">{c.author}</span>
                <span className="comment-time muted">{c.time}</span>
              </div>
              <p className="comment-text">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <Avatar name={currentUser.name} size="md" />
        <div className="comment-input-wrap">
          <input
            className="input"
            placeholder="Write a comment…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                handleSubmit(e)
              }
            }}
          />
          <button type="submit" className="btn btn-green comment-send" aria-label="Send comment">
            <Send size={16} /> Send
          </button>
        </div>
      </form>
    </section>
  )
}
