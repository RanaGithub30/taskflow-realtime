import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import '../Auth/Auth.css'
import { createUser } from "../../services/userService";

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    setIsSubmitting(true)

    try {
      await createUser({ name, email, password })
      navigate('/login', {
        state: {
          message: {
            type: 'success',
            text: 'Account created successfully. Please sign in to continue.'
          }
        }
      })
    } catch (error) {
      const backendMessage = error?.response?.data?.message
        || error?.response?.data?.error
        || error?.response?.data?.errors?.email?.[0]
        || 'We could not create your account right now. Please try again.'

      setMessage({ type: 'error', text: backendMessage })
    } finally {
      setIsSubmitting(false)
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
          <h1>Create your account</h1>
          <p className="muted">Start managing tasks with your team</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          {message.text ? (
            <div className={`auth-message ${message.type}`} aria-live="polite">
              {message.text}
            </div>
          ) : null}

          <label className="form-label">
            Full name
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

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

          <button type="submit" className="button button--primary auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="auth-footer">
          <span className="muted">Already have an account?</span>
          <Link to="/login" className="link">Sign in</Link>
        </div>
      </div>
    </div>
  )
}