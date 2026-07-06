import { Link } from 'react-router-dom'

function Navbar({ hideAuthButtons, ...props}) {
    return (
      <div className="auth-nav">
        <Link to="/" className="button button--secondary">{props?.homeLabel}</Link>
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
  homeLabel: 'Home',
}

export default Navbar;