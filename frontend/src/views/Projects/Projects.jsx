import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import './Projects.css'
import NewProjectModal from './NewProjectModal'

export default function Projects() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects = [
    {
      id: 1,
      name: 'TaskFlow redesign',
      team: 'UI/UX',
      progress: 78,
      status: 'Active',
      dueDate: '2024-08-05',
      members: ['RA', 'JO', 'SM'],
      budget: '$18.2k',
    },
    {
      id: 2,
      name: 'API platform build',
      team: 'Backend',
      progress: 52,
      status: 'Active',
      dueDate: '2024-08-20',
      members: ['MK', 'AL', 'SR'],
      budget: '$22.5k',
    },
    {
      id: 3,
      name: 'Mobile launch prep',
      team: 'Mobile',
      progress: 33,
      status: 'Planning',
      dueDate: '2024-09-10',
      members: ['EM', 'LT'],
      budget: '$12.8k',
    },
    {
      id: 4,
      name: 'Documentation hub',
      team: 'Docs',
      progress: 94,
      status: 'Review',
      dueDate: '2024-07-28',
      members: ['SM', 'RA'],
      budget: '$8.1k',
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="projects-layout">
      <Sidebar isAuthenticated={true} />

      {
        isModalOpen && 
        <NewProjectModal isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}/>
      }

      <main className="projects-main">
        <ProjectHeader
          onNewProject={() => setIsModalOpen(true)}
        />

        <section className="projects-toolbar">
          <div className="projects-search-wrapper">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="projects-search"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="toolbar-actions">
            <div className="toolbar-chip">Updated just now</div>
            <select
              className="projects-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Planning">Planning</option>
              <option value="Review">Review</option>
            </select>
          </div>
        </section>

        <section className="projects-summary">
          <div className="summary-card summary-card--primary">
            <span className="summary-icon">📁</span>
            <p className="summary-title">Projects</p>
            <p className="summary-value">{projects.length}</p>
            <p className="summary-caption">Active portfolio</p>
          </div>
          <div className="summary-card">
            <span className="summary-icon">⚡</span>
            <p className="summary-title">Active</p>
            <p className="summary-value">{projects.filter((p) => p.status === 'Active').length}</p>
            <p className="summary-caption">Currently moving</p>
          </div>
          <div className="summary-card">
            <span className="summary-icon">💰</span>
            <p className="summary-title">Budget</p>
            <p className="summary-value">$61.6k</p>
            <p className="summary-caption">Across this quarter</p>
          </div>
        </section>

        <section className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card-top">
                <p className={`project-status project-status--${project.status.toLowerCase()}`}>
                  {project.status}
                </p>
                <div className="project-progress-box">
                  <span>{project.progress}%</span>
                </div>
              </div>

              <div className="project-card-body">
                <h2 className="project-name">{project.name}</h2>
                <p className="project-team">{project.team}</p>
                <div className="project-progress-bar">
                  <div className="project-progress-fill" style={{ width: `${project.progress}%` }}></div>
                </div>
                <div className="project-meta">
                  <div>
                    <span className="meta-label">Due</span>
                    <p className="meta-value">{new Date(project.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="meta-label">Budget</span>
                    <p className="meta-value">{project.budget}</p>
                  </div>
                </div>
                <div className="project-members">
                  {project.members.map((member) => (
                    <span key={member} className="member-pill">{member}</span>
                  ))}
                </div>
              </div>

              <div className="project-card-footer">
                <button className="button-tertiary">View details</button>
              </div>
            </article>
          ))}
          {filteredProjects.length === 0 && (
            <div className="empty-message">No matching projects found.</div>
          )}
        </section>
      </main>
    </div>
  )
}

function ProjectHeader({ onNewProject }) {
  return (
    <header className="projects-header">
      <div className="projects-header-copy">
        <p className="projects-eyebrow">Projects</p>
        <h1>Project workspace</h1>
        <p className="projects-description">
          Track progress, budgets, and milestones across active initiatives.
        </p>
      </div>

      <div className="projects-header-actions">
        <div className="header-pill">24 milestones this week</div>

        <button
          className="button-primary"
          onClick={onNewProject}
        >
          + New project
        </button>
      </div>
    </header>
  );
}