import { Link } from 'react-router-dom'

export default function Navbar({ hideAuthButtons = false }) {
    return (
      <div className="auth-nav">
        <Link to="/" className="button button--secondary">Home</Link>
        {!hideAuthButtons && (
          <div className="auth-nav-actions">
            <Link to="/login" className="button button--secondary">Login</Link>
            <Link to="/register" className="button button--primary">Register</Link>
          </div>
        )}
      </div>
    )
}