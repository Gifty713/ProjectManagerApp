import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff, Layers, ShieldCheck, Zap } from "lucide-react"
import "../styles/auth.css"

export default function Register() {
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const nameParts = name.trim().split(/\s+/)

    if (nameParts.length < 2) {
      setError("Please enter both your first and last name.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "),
          email,
          password,
        }),
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Unable to create your account. Please try again.")

      navigate("/login", { state: { message: "Account created. Sign in to continue." } })
    } catch (err) {
      setError(err.message || "Unable to connect to the server. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth">
      <section className="auth-brand">
        <div className="brand">
          <span className="brand-mark">N</span>
          <span className="brand-name">Nexus</span>
        </div>

        <div className="auth-brand-body">
          <h2 className="text-balance">Start organizing work the way your team thinks.</h2>
          <p>
            Create your workspace in seconds and bring projects, tasks and discussions
            together in one polished home.
          </p>
        </div>

        <div className="auth-points">
          <div className="auth-point">
            <span className="auth-point-ic"><Layers size={17} /></span>
            Unlimited boards and workspaces
          </div>
          <div className="auth-point">
            <span className="auth-point-ic"><Zap size={17} /></span>
            Set up in under a minute
          </div>
          <div className="auth-point">
            <span className="auth-point-ic"><ShieldCheck size={17} /></span>
            Your data stays private and secure
          </div>
        </div>
      </section>

      <section className="auth-form-wrap">
        <div className="auth-card">
          <div className="brand mobile-only">
            <span className="brand-mark" style={{ background: "var(--plum)" }}>N</span>
            <span className="brand-name" style={{ color: "var(--ink)" }}>Nexus</span>
          </div>

          <div className="auth-head">
            <h1>Create your account</h1>
            <p>Join your team&apos;s workspace on Nexus.</p>
          </div>

          <form className="auth-fields" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <div className="input-wrap">
                <span className="lead-icon"><User size={17} /></span>
                <input id="name" className="input has-lead" type="text" placeholder="Amelia Rhodes" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <span className="lead-icon"><Mail size={17} /></span>
                <input id="email" className="input has-lead" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <span className="lead-icon"><Lock size={17} /></span>
                <input
                  id="password"
                  className="input has-lead has-trail"
                  type={showPw ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="trail-btn"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <div className="input-wrap">
                <span className="lead-icon"><Lock size={17} /></span>
                <input
                  id="confirm"
                  className="input has-lead has-trail"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="trail-btn"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-foot">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
