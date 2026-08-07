import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import TaskModalFields from './TaskModalFields'
import { getAllProjects } from '../../services/projectService'
import '../Tasks/Tasks.css'

const initialTasks = [
  {
    id: 1,
    title: 'Design dashboard layout',
    project: 'TaskFlow',
    priority: 'High',
    status: 'In Progress',
    assignee: 'You',
    dueDate: '2024-07-15',
    description: 'Create responsive dashboard with widgets',
    progress: 60,
  },
  {
    id: 2,
    title: 'Setup API endpoints',
    project: 'Backend',
    priority: 'High',
    status: 'In Progress',
    assignee: 'John',
    dueDate: '2024-07-20',
    description: 'Setup REST API with authentication',
    progress: 45,
  },
  {
    id: 3,
    title: 'Write unit tests',
    project: 'Backend',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Sarah',
    dueDate: '2024-07-25',
    description: 'Write comprehensive unit tests',
    progress: 0,
  },
  {
    id: 4,
    title: 'Database optimization',
    project: 'Infrastructure',
    priority: 'Medium',
    status: 'Completed',
    assignee: 'Mike',
    dueDate: '2024-07-10',
    description: 'Optimize database queries',
    progress: 100,
  },
  {
    id: 5,
    title: 'Update documentation',
    project: 'Docs',
    priority: 'Low',
    status: 'Pending',
    assignee: 'Alex',
    dueDate: '2024-07-30',
    description: 'Update project documentation',
    progress: 25,
  },
  {
    id: 6,
    title: 'Fix login bug',
    project: 'Frontend',
    priority: 'High',
    status: 'In Progress',
    assignee: 'You',
    dueDate: '2024-07-18',
    description: 'Fix authentication timeout issue',
    progress: 75,
  },
  {
    id: 7,
    title: 'Deploy to staging',
    project: 'DevOps',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Mike',
    dueDate: '2024-07-22',
    description: 'Deploy latest build to staging',
    progress: 10,
  },
  {
    id: 8,
    title: 'Code review',
    project: 'Backend',
    priority: 'Low',
    status: 'In Progress',
    assignee: 'Sarah',
    dueDate: '2024-07-19',
    description: 'Review pull requests',
    progress: 50,
  },
]

function TaskModal({ isOpen, values, onChange, onSave, onClose, projectOptions, errors }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card-header">
          <h2>Create Task</h2>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>

        <div className="modal-card-body">
        <TaskModalFields
          values={values}
          onChange={onChange}
          projectOptions={projectOptions}
          errors={errors}
        />
      </div>

        <div className="modal-card-footer">
          <button className="button-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="button-primary" type="button" onClick={onSave}>Save Task</button>
        </div>
      </div>
    </div>
  )
}

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [formValues, setFormValues] = useState({
    project: '',
    title: '',
    priority: 'Medium',
    deadline: '',
    status: 'Pending',
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        const projectNames = data
          .filter((project) => {
            const status = (project.status || '').toString().toLowerCase()
            return status !== 'completed' && status !== 'review'
          })
          .map((project) => project.name || project.title || '')
          .filter(Boolean)
        setProjects(projectNames)
      })
      .catch((error) => {
        console.error('Failed to load projects for task modal:', error)
      })
  }, [])

  const projectOptions = projects

  const handleOpenModal = () => {
    setFormValues({
      project: projectOptions[0] || '',
      title: '',
      priority: 'Medium',
      deadline: '',
      status: 'Pending',
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const errors = {}

    if (!formValues.project.trim()) {
      errors.project = 'Please select a project.'
    }

    if (!formValues.title.trim()) {
      errors.title = 'Please provide a task name.'
    }

    if (!formValues.priority.trim()) {
      errors.priority = 'Please select a priority.'
    }

    if (!formValues.deadline.trim()) {
      errors.deadline = 'Please choose a deadline.'
    }
    const today = new Date().toISOString().split('T')[0]
    if (formValues.deadline && formValues.deadline < today) {
      errors.deadline = 'Deadline cannot be in the past.'
    }
    if (!formValues.status.trim()) {
      errors.status = 'Please select a status.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveTask = () => {
    if (!validateForm()) {
      return
    }

    const newTask = {
      id: Date.now(),
      title: formValues.title,
      project: formValues.project,
      priority: formValues.priority,
      status: formValues.status,
      dueDate: formValues.deadline,
      assignee: 'You',
      description: '',
      progress: 0,
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
    setIsModalOpen(false)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc2626'
      case 'Medium': return '#d97706'
      case 'Low': return '#16a34a'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return '#2563eb'
      case 'Completed': return '#16a34a'
      case 'Pending': return '#64748b'
      default: return '#6b7280'
    }
  }

  return (
    <div className="tasks-layout">
      <Sidebar isAuthenticated={true} />

      <TaskModal
        isOpen={isModalOpen}
        values={formValues}
        onChange={handleFormChange}
        onSave={handleSaveTask}
        onClose={handleCloseModal}
        projectOptions={projectOptions}
        errors={formErrors}
      />

      <main className="tasks-main">
        <header className="tasks-header">
          <div>
            <h1 className="tasks-title">Tasks</h1>
            <p className="tasks-subtitle">Manage and track all your tasks</p>
          </div>
          <button className="button-primary tasks-new-task-button" onClick={handleOpenModal}>+ New Task</button>
        </header>

        <div className="tasks-controls">
          <div className="tasks-search-wrapper">
            <input
              type="text"
              className="tasks-search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="tasks-filters">
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="filter-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              ≡
            </button>
          </div>
        </div>

        <div className="tasks-layout-grid">
          <div className="tasks-feed">
            <div className="tasks-stats">
              <div className="stat-item">
                <span className="stat-label">Total</span>
                <span className="stat-number">{tasks.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">In Progress</span>
                <span className="stat-number">{tasks.filter((t) => t.status === 'In Progress').length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completed</span>
                <span className="stat-number">{tasks.filter((t) => t.status === 'Completed').length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pending</span>
                <span className="stat-number">{tasks.filter((t) => t.status === 'Pending').length}</span>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="tasks-grid">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <div className="task-card-header">
                        <h3 className="task-card-title">{task.title}</h3>
                        <span className={`badge badge-${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                      </div>

                      <p className="task-card-description">{task.description}</p>

                      <div className="task-card-meta">
                        <div className="meta-item">
                          <span className="meta-label">Project:</span>
                          <span className="meta-value">{task.project}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Due:</span>
                          <span className="meta-value">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</span>
                        </div>
                      </div>

                      <div className="task-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                        </div>
                        <span className="progress-text">{task.progress}%</span>
                      </div>

                      <div className="task-card-footer">
                        <div className="task-assignee-badge">{task.assignee.substring(0, 2).toUpperCase()}</div>
                        <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                          {task.status}
                        </span>
                      </div>

                      <div className="task-card-actions">
                        <button className="action-icon" title="Edit">✏️</button>
                        <button className="action-icon" title="View details">👁️</button>
                        <button className="action-icon" title="Delete">🗑️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No tasks found</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="tasks-table-wrapper">
                <table className="tasks-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Project</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assignee</th>
                      <th>Progress</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <tr key={task.id}>
                          <td className="table-task-title">{task.title}</td>
                          <td>{task.project}</td>
                          <td>
                            <span className={`badge badge-${task.priority.toLowerCase()}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="table-assignee">{task.assignee}</td>
                          <td>
                            <div className="table-progress">
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                              </div>
                              <span className="progress-text-small">{task.progress}%</span>
                            </div>
                          </td>
                          <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</td>
                          <td className="table-actions">
                            <button className="table-action-btn" title="Edit">✏️</button>
                            <button className="table-action-btn" title="View">👁️</button>
                            <button className="table-action-btn" title="Delete">🗑️</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="empty-table">No tasks found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <aside className="tasks-sidebar">
            <div className="panel-card">
              <p className="panel-title">Upcoming Deadlines</p>
              <div className="deadline-item">
                <div>
                  <p className="deadline-title">Design dashboard layout</p>
                  <p className="deadline-meta">Due 7/15/2024 · TaskFlow</p>
                </div>
                <span className="deadline-badge deadline-high">High</span>
              </div>
              <div className="deadline-item">
                <div>
                  <p className="deadline-title">Fix login bug</p>
                  <p className="deadline-meta">Due 7/18/2024 · Frontend</p>
                </div>
                <span className="deadline-badge deadline-high">High</span>
              </div>
              <div className="deadline-item">
                <div>
                  <p className="deadline-title">Setup API endpoints</p>
                  <p className="deadline-meta">Due 7/20/2024 · Backend</p>
                </div>
                <span className="deadline-badge deadline-medium">Medium</span>
              </div>
            </div>

            <div className="panel-card">
              <p className="panel-title">Focus This Week</p>
              <div className="focus-row">
                <div>
                  <p className="focus-label">Tasks due soon</p>
                  <p className="focus-value">3</p>
                </div>
                <div>
                  <p className="focus-label">Open tasks</p>
                  <p className="focus-value">{tasks.length}</p>
                </div>
              </div>
              <div className="focus-progress-wrapper">
                <p className="focus-progress-title">Team progress</p>
                <div className="focus-progress-bar">
                  <div className="focus-progress-fill" style={{ width: '68%' }}></div>
                </div>
                <span className="focus-progress-text">68% complete</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
