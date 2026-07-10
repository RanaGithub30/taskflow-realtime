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

        <section className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th className="serial-column">Sl. No</th>
                <th>Project</th>
                <th>Team</th>
                <th>Status</th>
                <th>Due date</th>
                <th>Budget</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <tr key={project.id}>
                  <td className="serial-column">{index + 1}</td>
                  <td>
                    <div className="project-table-name">{project.name}</div>
                    <div className="project-table-subtitle">{project.members.join(', ')}</div>
                  </td>
                  <td>{project.team}</td>
                  <td>
                    <span className={`project-status project-status--${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>{new Date(project.dueDate).toLocaleDateString()}</td>
                  <td>{project.budget}</td>
                  <td>
                    <div className="table-actions">
                      <button className="table-action-btn table-action-btn--edit">
                        <span className="table-action-icon">✏️</span>
                        Edit
                      </button>
                      <button className="table-action-btn table-action-btn--delete">
                        <span className="table-action-icon">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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