import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import './Timer.css'

export default function Timer() {
  const [selectedProject, setSelectedProject] = useState('TaskFlow redesign')
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const projects = [
    'TaskFlow redesign',
    'API platform build',
    'Mobile launch prep',
    'Documentation hub',
  ]

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${hours}:${minutes}:${secs}`
  }

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedSeconds(0)
  }

  return (
    <div className="timer-layout">
      <Sidebar />
      <main className="timer-main">
        <header className="timer-header">
          <div>
            <p className="timer-eyebrow">Project Timer</p>
            <h1 className="timer-title">Keep your work sessions on track</h1>
            <p className="timer-description">
              Start and pause a timer for selected projects, then review recent tracking sessions.
            </p>
          </div>
          <div className="timer-actions">
            <button className="button-secondary">Activity log</button>
            <button className="button-primary">New session</button>
          </div>
        </header>

        <section className="timer-card">
          <div className="timer-panel">
            <div className="timer-panel-row">
              <div>
                <label className="timer-field-label">Select project</label>
                <select
                  className="timer-select"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  {projects.map((project) => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              <div className="timer-status-card">
                <span className="timer-status-label">Current project</span>
                <strong>{selectedProject}</strong>
              </div>
            </div>

            <div className="timer-display">
              <p className="timer-display-label">Elapsed time</p>
              <span className="timer-display-value">{formatTime(elapsedSeconds)}</span>
            </div>

            <div className="timer-button-group">
              <button
                className={`button-primary ${isRunning ? 'button-secondary' : ''}`}
                onClick={() => setIsRunning((value) => !value)}
              >
                {isRunning ? 'Pause timer' : 'Start timer'}
              </button>
              <button className="button-secondary" onClick={resetTimer}>
                Reset timer
              </button>
            </div>
          </div>
        </section>

        <section className="timer-grid">
          <article className="timer-card summary-card">
            <h2>Today's sessions</h2>
            <ul className="timer-summary-list">
              <li>
                <span>TaskFlow redesign</span>
                <span>1h 12m</span>
              </li>
              <li>
                <span>API platform build</span>
                <span>45m</span>
              </li>
              <li>
                <span>Mobile launch prep</span>
                <span>30m</span>
              </li>
            </ul>
          </article>

          <article className="timer-card summary-card">
            <h2>Weekly focus</h2>
            <p className="timer-summary-note">Your timer is ready. Track time for priority projects and improve delivery visibility.</p>
          </article>
        </section>
      </main>
    </div>
  )
}
