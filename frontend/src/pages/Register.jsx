import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff, Layers, ShieldCheck, Zap } from "lucide-react"
import "../styles/auth.css"

export default function Register() {
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
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
                <input id="name" className="input has-lead" type="text" placeholder="Amelia Rhodes" required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <span className="lead-icon"><Mail size={17} /></span>
                <input id="email" className="input has-lead" type="email" placeholder="you@company.com" required />
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

            <button type="submit" className="btn btn-primary btn-block">Create account</button>
          </form>

          <p className="auth-foot">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
