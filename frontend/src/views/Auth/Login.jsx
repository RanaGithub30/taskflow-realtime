import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import '../Auth/Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Integrate with backend auth
    console.log('login', { email, password })
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
          <Link to="/register" className="link">Create an account</Link>
        </div>
      </div>
    </div>
  )
}
