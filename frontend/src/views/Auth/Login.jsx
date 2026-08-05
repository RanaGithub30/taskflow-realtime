import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import { loginUser, getUserDetails } from "../../services/userService";
import '../Auth/Auth.css'

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState(location.state?.message || { type: '', text: '' })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const next = params.get('next')
    if (!next) {
      return
    }

    ;(async () => {
      try {
        const user = await getUserDetails().catch(() => null)
        if (user) {
          if (next.startsWith('http')) {
            window.location.href = next
          } else {
            navigate(next)
          }
        }
      } catch (err) {
        // Not logged in, keep showing login page
      }
    })()
  }, [location.search, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams(location.search)
    const nextDestination = params.get('next') || '/dashboard'

    try{
      await loginUser({ email, password })
      if (nextDestination.startsWith('http')) {
        window.location.href = nextDestination
        return
      }
      navigate(nextDestination, {
        state: {
          message: {
            type: 'success',
            text: 'You have successfully logged in.'
          }
        }
      })
    }catch (error) {
      const backendMessage = error?.response?.data?.message
        || error?.response?.data?.error
        || error?.response?.data?.errors?.email?.[0]
        || 'We could not log you in right now. Please try again.'

      setStatusMessage({ type: 'error', text: backendMessage })
    }

  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <header className="auth-page-head">
          <Navbar hideAuthButtons />
        </header>
        <header className="auth-header">
          <div className="brand-mark">TF</div>
          <h1>Welcome back</h1>
          <p className="muted">Log in to continue to TaskFlow</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          {statusMessage?.text ? (
            <div className={`auth-message ${statusMessage.type}`} aria-live="polite">
              {statusMessage.text}
            </div>
          ) : null}

          <label className="form-label">
            Email
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Password
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="form-row">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <a className="forgot" href="#">Forgot?</a>
          </div>

          <button type="submit" className="button button--primary auth-submit">Sign in</button>
        </form>

        <div className="auth-footer">
          <span className="muted">Don’t have an account?</span>
          {(() => {
            const params = new URLSearchParams(location.search)
            const next = params.get('next')
            const to = next ? `/register?next=${encodeURIComponent(next)}` : '/register'
            return <Link to={to} className="link">Create an account</Link>
          })()}
        </div>
      </div>
    </div>
  )
}