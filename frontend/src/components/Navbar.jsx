import { Link } from 'react-router-dom'

export default function Navbar(){
    return (
        <div className="home-actions">
          <Link to="/login" className="button button--secondary">Login</Link>
          <Link to="/register" className="button button--primary">Register</Link>
        </div>
    );
}