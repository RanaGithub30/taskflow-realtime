import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setAuthToken } from '../services/api'
import { getUserDetails as fetchUserDetails } from '../services/userService'
import './Sidebar.css'

function Sidebar({ isAuthenticated, ...props }) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!isAuthenticated) {
        setUser(null)
        return
      }

      try {
        const data = await fetchUserDetails()
        setUser(data?.user || data)
      } catch (error) {
        console.error('Error fetching user details:', error)
        setUser(null)
      }
    }

    loadUserDetails()
  }, [isAuthenticated])

  const handleLogout = async () => {
    try {
      setAuthToken(null)
      setUser(null)
      setActiveMenu('dashboard')
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error occurred while logging out:', error)
    }
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '/dashboard'
    },
    {
      id: 'team',
      label: 'Team',
      icon: '👥',
      href: '/team'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '📁',
      href: '/projects'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: '✓',
      href: '/tasks'
    },
    {
      id: 'timer',
      label: 'Project Timer',
      icon: '⏱️',
      href: '/timer'
    },
    {
      id: 'bugs',
      label: 'Projects Bug Tracker',
      icon: '🐞',
      href: '/bugs'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📈',
      href: '/reports'
    },
  ]

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      href: '/settings'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: '❓',
      href: '/help'
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: '🚪',
      action: handleLogout
    },
  ]

  const visibleMenuItems = [...menuItems, ...bottomMenuItems]
  const activeMenuId = visibleMenuItems.find((item) => item.href === location.pathname)?.id || activeMenu
  const displayName = user?.name || user?.email || 'User'
  const displayRole = user?.role || 'Admin'

  return (
    <>
    {!isAuthenticated ? (
        <>
        <span className="brand__mark">{props.brandMark}</span>
        <div>
            <p className="brand__name">{props.brandName}</p>
            <p className="brand__tag">{props.brandTag}</p>
          </div>
        </>
      ):(

        <>
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
        {/* Brand Section */}
        <div className="sidebar-brand">
          <Link to="/" className="sidebar-brand-link">
            <div className="sidebar-brand-mark">TF</div>
            <div className={`sidebar-brand-text ${!isOpen ? 'hidden' : ''}`}>
              <p className="sidebar-brand-name">TaskFlow</p>
              <p className="sidebar-brand-tag">Admin</p>
            </div>
          </Link>
        </div>

        {/* Main Menu */}
        <nav className="sidebar-nav">
          <div className="sidebar-menu-section">
            {isOpen && <p className="sidebar-section-title">Main Menu</p>}
            <ul className="sidebar-menu">
              {menuItems.map(item => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className={`sidebar-menu-item ${activeMenuId === item.id ? 'active' : ''}`}
                    onClick={() => setActiveMenu(item.id)}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className="sidebar-menu-icon">{item.icon}</span>
                    <span className={`sidebar-menu-label ${!isOpen ? 'hidden' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Menu */}
          <div className="sidebar-menu-section sidebar-menu-bottom">
            {isOpen && <p className="sidebar-section-title">Settings</p>}
            <ul className="sidebar-menu">
              {bottomMenuItems.map(item => (
                <li key={item.id}>
                  {item.action ? (
                    <button
                      type="button"
                      className={`sidebar-menu-item sidebar-menu-button ${activeMenuId === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveMenu(item.id)
                        item.action()
                      }}
                      title={!isOpen ? item.label : ''}
                    >
                      <span className="sidebar-menu-icon">{item.icon}</span>
                      <span className={`sidebar-menu-label ${!isOpen ? 'hidden' : ''}`}>
                        {item.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`sidebar-menu-item ${activeMenuId === item.id ? 'active' : ''}`}
                      onClick={() => setActiveMenu(item.id)}
                      title={!isOpen ? item.label : ''}
                    >
                      <span className="sidebar-menu-icon">{item.icon}</span>
                      <span className={`sidebar-menu-label ${!isOpen ? 'hidden' : ''}`}>
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Section */}
        <div className={`sidebar-user ${!isOpen ? 'sidebar-user--collapsed' : ''}`}>
          <div className="sidebar-user-avatar">{displayName.charAt(0).toUpperCase()}</div>
          <div className={`sidebar-user-info ${!isOpen ? 'hidden' : ''}`}>
            <p className="sidebar-user-name">{displayName}</p>
            <p className="sidebar-user-role">{displayRole}</p>
          </div>
        </div>
      </aside>
       </>
      )}
    </>
  )
}

Sidebar.defaultProps = {
  isAuthenticated: false,
  brandMark: 'TF',
  brandName: 'TaskFlow',
  brandTag: 'Task Management',
}

export default Sidebar;