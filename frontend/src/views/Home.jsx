import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#results', label: 'Results' },
  { href: '#contact', label: 'Contact' },
]

const FEATURES = [
  {
    icon: '📋',
    title: 'Project boards',
    description: 'Group tasks, milestones, and handoffs into clear workflows that everyone can follow.',
  },
  {
    icon: '👥',
    title: 'Team collaboration',
    description: 'Share updates, attach files, and align stakeholders from a single workspace.',
  },
  {
    icon: '📊',
    title: 'Status tracking',
    description: 'Monitor progress, deadlines, and blockers across workstreams in real time.',
  },
  {
    icon: '🔔',
    title: 'Automated reminders',
    description: 'Reduce manual follow-up with automation that keeps work moving forward.',
  },
]

function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const closeMobileNav = () => setMobileNavOpen(false)

  return (
    <div className="home-page">
      <div className="home-shell">
        <header className="home-header">
          <div className="brand">
            <Sidebar />
          </div>

          <button
            type="button"
            className="home-nav-toggle"
            aria-expanded={mobileNavOpen}
            aria-controls="home-mobile-nav"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>

          <nav className="home-nav home-nav--desktop" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <nav
            id="home-mobile-nav"
            className={`home-nav home-nav--mobile ${mobileNavOpen ? 'home-nav--mobile-open' : ''}`}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMobileNav}>{link.label}</a>
            ))}
          </nav>

          <Navbar hideHomeLink />
        </header>

        <section className="home-hero">
          <div className="home-hero__copy">
            <p className="eyebrow">A professional way to manage tasks</p>
            <h1>TaskFlow helps teams deliver work with clarity, speed, and accountability.</h1>
            <p className="hero-text">
              Centralize projects, automate follow-up, and keep every stakeholder aligned across planning,
              execution, and rollout.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="button button--primary">Start free trial</Link>
              <Link to="/login" className="button button--secondary">View demo</Link>
            </div>

            <div className="hero-highlights">
              <div>
                <strong>Structured workflows</strong>
                <span>Move from idea to delivery with fewer hand-offs.</span>
              </div>
              <div>
                <strong>Real-time clarity</strong>
                <span>See priorities, blockers, and progress in one view.</span>
              </div>
            </div>
          </div>

          <aside className="home-hero__panel" aria-hidden="true">
            <div className="dashboard-card">
              <div className="dashboard-card__header">
                <span>Today&apos;s board</span>
                <strong>Roadmap sprint</strong>
              </div>
              <div className="dashboard-card__status">
                <div>
                  <span>In progress</span>
                  <strong>18</strong>
                </div>
                <div>
                  <span>Completed</span>
                  <strong>42</strong>
                </div>
                <div>
                  <span>Upcoming</span>
                  <strong>6</strong>
                </div>
              </div>
              <div className="dashboard-card__summary">
                Focus your team on the highest-value tasks and reduce cross-team meetings.
              </div>
            </div>
          </aside>
        </section>

        <section id="features" className="home-features">
          <div className="section-heading">
            <span>Features built for delivery</span>
            <h2>Everything teams need to plan, track, and ship work.</h2>
          </div>

          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="feature-card">
                <span className="feature-card__icon" aria-hidden="true">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="home-workflow">
          <div className="workflow-copy">
            <span>Streamline your process</span>
            <h2>From planning to delivery, one modern workflow.</h2>
            <p>
              Set priorities, assign owners, and review progress without switching tools or losing context.
            </p>
          </div>

          <div className="workflow-cards">
            <div className="workflow-step">
              <strong>1</strong>
              <div>
                <h3>Plan</h3>
                <p>Define scope, timelines, and team responsibilities in a structured board.</p>
              </div>
            </div>
            <div className="workflow-step">
              <strong>2</strong>
              <div>
                <h3>Execute</h3>
                <p>Track progress with status updates, checklists, and real-time comments.</p>
              </div>
            </div>
            <div className="workflow-step">
              <strong>3</strong>
              <div>
                <h3>Deliver</h3>
                <p>Measure outcomes, close work neatly, and keep teams aligned on next priorities.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="home-stats">
          <div className="stat-card">
            <strong>95%</strong>
            <p>Faster team adoption</p>
          </div>
          <div className="stat-card">
            <strong>120+</strong>
            <p>Tasks completed daily</p>
          </div>
          <div className="stat-card">
            <strong>4.8</strong>
            <p>Average user rating</p>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-cta__inner">
            <h2>Ready to streamline your team&apos;s work?</h2>
            <p>Join teams who plan, track, and deliver with TaskFlow every day.</p>
            <div className="hero-actions">
              <Link to="/register" className="button button--primary">Get started free</Link>
              <Link to="/login" className="button button--secondary">Sign in</Link>
            </div>
          </div>
        </section>

        <footer id="contact" className="home-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand__mark">TF</div>
              <div>
                <strong>TaskFlow</strong>
                <p>Task management platform for modern teams.</p>
              </div>
            </div>

            <div className="footer-links">
              <strong>Product</strong>
              <a href="#features">Features</a>
              <a href="#workflow">Workflow</a>
              <a href="#results">Results</a>
            </div>

            <div className="footer-links">
              <strong>Account</strong>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>

          <p className="footer-copy">&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default Home
