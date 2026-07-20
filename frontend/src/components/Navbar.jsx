import { Link } from 'react-router-dom'

function Navbar({ hideAuthButtons, hideHomeLink, ...props }) {
  return (
    <div className="auth-nav">
      {!hideHomeLink && (
        <Link to="/" className="button button--secondary">{props?.homeLabel}</Link>
      )}
      {!hideAuthButtons && (
        <div className="auth-nav-actions">
          <Link to="/login" className="button button--secondary">Login</Link>
          <Link to="/register" className="button button--primary">Register</Link>
        </div>
      )}
    </div>
  )
}

Navbar.defaultProps = {
  hideAuthButtons: false,
  hideHomeLink: false,
  homeLabel: 'Home',
}

export default Navbar;