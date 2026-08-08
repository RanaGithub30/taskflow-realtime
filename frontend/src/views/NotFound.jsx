import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const isAuthenticated = Boolean(localStorage.getItem('authToken') || localStorage.getItem('access_token'))

  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <div className="not-found-mark" aria-hidden="true">TF</div>
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p className="not-found-message">
          The page you’re looking for may have moved, been removed, or never existed.
        </p>
        <div className="not-found-actions">
          <Link className="not-found-primary" to={isAuthenticated ? '/dashboard' : '/login'}>
            {isAuthenticated ? 'Go to dashboard' : 'Go to login'}
          </Link>
          <Link className="not-found-secondary" to="/">Back to home</Link>
        </div>
      </section>
    </main>
  )
}
