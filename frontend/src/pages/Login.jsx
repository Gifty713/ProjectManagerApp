import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, Layers, ShieldCheck, Zap } from "lucide-react"
import { useAuth } from "../auth/AuthContext.jsx"
import "../styles/auth.css"

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Unable to sign in. Please try again.")

      await signIn()
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true })
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
          <h2 className="text-balance">Where software teams ship their best work.</h2>
          <p>
            Plan projects, track tasks across boards, and keep everyone aligned in one
            calm, focused workspace.
          </p>
        </div>

        <div className="auth-points">
          <div className="auth-point">
            <span className="auth-point-ic"><Layers size={17} /></span>
            Unified project boards and timelines
          </div>
          <div className="auth-point">
            <span className="auth-point-ic"><Zap size={17} /></span>
            Real-time progress at a glance
          </div>
          <div className="auth-point">
            <span className="auth-point-ic"><ShieldCheck size={17} /></span>
            Enterprise-grade access controls
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
            <h1>Welcome back</h1>
            <p>Sign in to continue to your workspace.</p>
          </div>

          <form className="auth-fields" onSubmit={handleSubmit}>
            {location.state?.message && <p className="auth-success" role="status">{location.state.message}</p>}
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
                  placeholder="Enter your password"
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

            <div className="auth-row">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="auth-link" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-foot">
            Don&apos;t have an account? <Link to="/register" className="auth-link">Create one</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
