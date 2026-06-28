import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '/dashboard'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: '✓',
      href: '/tasks'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '📁',
      href: '/projects'
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
      id: 'team',
      label: 'Team',
      icon: '👥',
      href: '/team'
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
  ]

  return (
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
                    className={`sidebar-menu-item ${activeMenu === item.id ? 'active' : ''}`}
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
                  <Link
                    to={item.href}
                    className={`sidebar-menu-item ${activeMenu === item.id ? 'active' : ''}`}
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
        </nav>

        {/* User Section */}
        <div className={`sidebar-user ${!isOpen ? 'sidebar-user--collapsed' : ''}`}>
          <div className="sidebar-user-avatar">RA</div>
          <div className={`sidebar-user-info ${!isOpen ? 'hidden' : ''}`}>
            <p className="sidebar-user-name">Rana Saha</p>
            <p className="sidebar-user-role">Admin</p>
          </div>
        </div>
      </aside>
    </>
  )
}
