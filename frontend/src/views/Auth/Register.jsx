import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Auth/Auth.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Integrate with backend registration
    console.log('register', { name, email, password })
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <header className="auth-header">
          <div className="brand-mark">TF</div>
          <h1>Create your account</h1>
          <p className="muted">Start managing tasks with your team</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="button button--primary auth-submit">Create account</button>
        </form>

        <div className="auth-footer">
          <span className="muted">Already have an account?</span>
          <Link to="/login" className="link">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
