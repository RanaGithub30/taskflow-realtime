import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import './Team.css'

export default function Team() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const members = [
    { id: 1, name: 'Rana Saha', role: 'Admin', team: 'Operations', email: 'rana@example.com', status: 'Active' },
    { id: 2, name: 'John Doe', role: 'Developer', team: 'Backend', email: 'john@example.com', status: 'Active' },
    { id: 3, name: 'Sarah Miller', role: 'QA Engineer', team: 'Testing', email: 'sarah@example.com', status: 'Active' },
    { id: 4, name: 'Mike Johnson', role: 'DevOps', team: 'Infrastructure', email: 'mike@example.com', status: 'Away' },
    { id: 5, name: 'Alex Lee', role: 'Product Manager', team: 'Product', email: 'alex@example.com', status: 'Active' },
    { id: 6, name: 'Emily Wong', role: 'UI/UX Designer', team: 'Design', email: 'emily@example.com', status: 'Active' },
  ]

  const filteredMembers = members.filter((member) => {
    const searchLower = search.toLowerCase()
    const matchesSearch = member.name.toLowerCase().includes(searchLower) || member.team.toLowerCase().includes(searchLower)
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="team-layout">
      <Sidebar isAuthenticated={true} />

      <main className="team-main">
        <header className="team-header">
          <div>
            <p className="team-eyebrow">Team</p>
            <h1>Team members</h1>
            <p className="team-description">Monitor team activity, member roles, and collaboration status.</p>
          </div>
          <button className="button-primary">Invite member</button>
        </header>

        <section className="team-toolbar">
          <div className="team-search-wrapper">
            <input
              type="text"
              className="team-search"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            className="team-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="DevOps">DevOps</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </section>

        <section className="team-summary">
          <div className="summary-card">
            <p className="summary-title">Total members</p>
            <p className="summary-value">{members.length}</p>
          </div>
          <div className="summary-card">
            <p className="summary-title">Active</p>
            <p className="summary-value">{members.filter((member) => member.status === 'Active').length}</p>
          </div>
          <div className="summary-card">
            <p className="summary-title">Teams</p>
            <p className="summary-value">{new Set(members.map((member) => member.team)).size}</p>
          </div>
        </section>

        <section className="team-grid">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <article key={member.id} className="member-card">
                <div className="member-card-top">
                  <div className="member-avatar">{member.name.split(' ').map((part) => part[0]).join('')}</div>
                  <span className={`member-status member-status--${member.status.toLowerCase()}`}>{member.status}</span>
                </div>
                <h2 className="member-name">{member.name}</h2>
                <p className="member-role">{member.role}</p>
                <div className="member-info">
                  <div>
                    <p className="info-label">Team</p>
                    <p className="info-value">{member.team}</p>
                  </div>
                  <div>
                    <p className="info-label">Email</p>
                    <p className="info-value">{member.email}</p>
                  </div>
                </div>
                <div className="member-actions">
                  <button className="button-secondary">Message</button>
                  <button className="button-tertiary">View</button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">No team members found.</div>
          )}
        </section>
      </main>
    </div>
  )
}
