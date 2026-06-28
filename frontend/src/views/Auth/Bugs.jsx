import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import './Bugs.css'

export default function Bugs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [bugList, setBugList] = useState([
    { id: 1, project: 'API platform build', title: 'Auth endpoint failing', status: 'Open', priority: 'High' },
    { id: 2, project: 'Mobile launch prep', title: 'Push notifications broken', status: 'In Progress', priority: 'Medium' },
    { id: 3, project: 'TaskFlow redesign', title: 'Header menu overlaps content', status: 'Review', priority: 'Low' },
    { id: 4, project: 'Documentation hub', title: 'Search results not visible', status: 'Open', priority: 'High' },
  ])

  const updateStatus = (id, status) => {
    setBugList((bugs) => bugs.map((bug) => (bug.id === id ? { ...bug, status } : bug)))
  }

  const filteredBugs = bugList.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.project.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || bug.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="bugs-layout">
      <Sidebar />
      <main className="bugs-main">
        <header className="bugs-header">
          <div>
            <p className="bugs-eyebrow">Projects Bug Tracker</p>
            <h1 className="bugs-title">Review, update, and triage issues</h1>
            <p className="bugs-description">Keep bug workflows clear by assigning statuses and filtering issues by project.</p>
          </div>
          <div className="bugs-actions">
            <button className="button-secondary">Export</button>
            <button className="button-primary">New bug</button>
          </div>
        </header>

        <section className="bugs-controls">
          <div className="bugs-search-wrapper">
            <input
              type="text"
              className="bugs-search"
              placeholder="Search bugs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <select
            className="bugs-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Fixed">Fixed</option>
          </select>
        </section>

        <section className="bugs-grid">
          <div className="bugs-summary-card">
            <h2>Issue overview</h2>
            <p>{bugList.length} total bugs across active projects.</p>
          </div>
          <div className="bugs-summary-card">
            <h2>Open issues</h2>
            <p>{bugList.filter((bug) => bug.status === 'Open').length} open</p>
          </div>
        </section>

        <section className="bugs-table-card">
          <div className="bugs-table-header">
            <h2>Bug list</h2>
            <span>{filteredBugs.length} items</span>
          </div>
          <div className="bugs-table-wrapper">
            <table className="bugs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBugs.map((bug) => (
                  <tr key={bug.id}>
                    <td>{bug.title}</td>
                    <td>{bug.project}</td>
                    <td>
                      <span className={`badge badge-${bug.priority.toLowerCase()}`}>
                        {bug.priority}
                      </span>
                    </td>
                    <td>
                      <select
                        className="bug-status-select"
                        value={bug.status}
                        onChange={(e) => updateStatus(bug.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Fixed">Fixed</option>
                      </select>
                    </td>
                    <td>
                      <button className="button-secondary">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
