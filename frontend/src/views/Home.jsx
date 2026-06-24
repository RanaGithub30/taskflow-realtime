import './Home.css'
import Navbar from '../components/navbar'

function Home() {
  return (
    <div className="home-shell">
      <header className="home-header">
        <div className="brand">
          <span className="brand__mark">TF</span>
          <div>
            <p className="brand__name">TaskFlow</p>
            <p className="brand__tag">Task Management</p>
          </div>
        </div>

        <nav className="home-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#results">Results</a>
          <a href="#contact">Contact</a>
        </nav>

        <Navbar />
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
            <button className="button button--primary">Start free trial</button>
            <button className="button button--secondary">View demo</button>
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

        <aside className="home-hero__panel">
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <span>Today’s board</span>
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
          <article className="feature-card">
            <h3>Project boards</h3>
            <p>Group tasks, milestones, and handoffs into clear workflows that everyone can follow.</p>
          </article>
          <article className="feature-card">
            <h3>Team collaboration</h3>
            <p>Share updates, attach files, and align stakeholders from a single workspace.</p>
          </article>
          <article className="feature-card">
            <h3>Status tracking</h3>
            <p>Monitor progress, deadlines, and blockers across workstreams in real time.</p>
          </article>
          <article className="feature-card">
            <h3>Automated reminders</h3>
            <p>Reduce manual follow-up with automation that keeps work moving forward.</p>
          </article>
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

      <footer id="contact" className="home-footer">
        <p>TaskFlow • Task Management platform for modern teams.</p>
      </footer>
    </div>
  )
}

export default Home
