import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import TaskModalFields from './TaskModalFields'
import { getAllProjects } from '../../services/projectService'
import { createTask, deleteTask, getAllTasks, updateTask } from '../../services/taskService'
import { showAlert } from '../../utils/alert'
import '../Tasks/Tasks.css'

const initialTasks = [
 
]

function TaskModal({ isOpen, values, onChange, onSave, onClose, projectOptions, errors, isEditing }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={(event) => {
        event.preventDefault()
        onSave()
      }}>
        <div className="modal-card-header">
          <h2>{isEditing ? 'Edit Task' : 'Create Task'}</h2>
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
          <button className="button-primary" type="submit">{isEditing ? 'Update Task' : 'Save Task'}</button>
        </div>
      </form>
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
  const [deletingTaskId, setDeletingTaskId] = useState(null)
  const [editingTaskId, setEditingTaskId] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectData, taskData] = await Promise.all([
          getAllProjects(),
          getAllTasks(),
        ])

        const projectNames = projectData
          .filter((project) => {
            const status = (project.status || '').toString().toLowerCase()
            return status !== 'completed' && status !== 'review'
          })
          .map((project) => project.name || project.title || '')
          .filter(Boolean)
        setProjects(projectNames)

        const normalizedTasks = (Array.isArray(taskData) ? taskData : []).map((task) => ({
          id: task.id,
          title: task.title,
          project: task.project || 'Unassigned',
          priority: task.priority || 'Medium',
          status: task.status || 'Pending',
          dueDate: task.deadline,
          assignee: task.assignee || 'You',
          description: task.description || '',
          progress: task.progress || 0,
        }))

        setTasks(normalizedTasks)
      } catch (error) {
        console.error('Failed to load tasks data:', error)
      }
    }

    loadData()
  }, [])

  const projectOptions = projects

  const handleOpenModal = () => {
    const defaultProject = projectOptions[0] || ''

    setFormValues({
      project: defaultProject,
      title: '',
      priority: 'Medium',
      deadline: '',
      status: 'Pending',
    })
    setFormErrors({})
    setEditingTaskId(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setFormValues({
      project: task.project === 'Unassigned' ? '' : task.project || '',
      title: task.title || '',
      priority: task.priority || 'Medium',
      deadline: task.dueDate ? task.dueDate.slice(0, 10) : '',
      status: task.status || 'Pending',
    })
    setFormErrors({})
    setEditingTaskId(task.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTaskId(null)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const errors = {}
    const selectedProject = String(formValues.project ?? '').trim()

    // if (!selectedProject) {
    //   errors.project = 'Please select a project.'
    // }

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

  const handleSaveTask = async () => {
    if (!validateForm()) {
      return
    }

    try {
      const payload = {
        title: formValues.title,
        project: formValues.project,
        priority: formValues.priority,
        status: formValues.status,
        deadline: formValues.deadline,
        description: '',
        progress: 0,
      }

      const isEditing = editingTaskId !== null
      const savedTask = isEditing
        ? await updateTask(editingTaskId, payload)
        : await createTask(payload)

      const taskDetails = {
        id: savedTask.id || editingTaskId || Date.now(),
        title: savedTask.title || formValues.title,
        project: savedTask.project || formValues.project || 'Unassigned',
        priority: savedTask.priority || formValues.priority,
        status: savedTask.status || formValues.status,
        dueDate: savedTask.deadline || formValues.deadline,
        assignee: 'You',
        description: savedTask.description || '',
        progress: savedTask.progress || 0,
      }

      setTasks((prevTasks) => isEditing
        ? prevTasks.map((task) => (task.id === editingTaskId ? { ...task, ...taskDetails } : task))
        : [taskDetails, ...prevTasks])
      handleCloseModal()
      setFormErrors({})
      showAlert.success(isEditing ? 'Task updated successfully.' : 'Task created successfully.')
    } catch (error) {
      console.error('Failed to save task:', error)
      const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Unable to save the task right now.'
      showAlert.error(message)
    }
  }

  const handleDeleteTask = async (task) => {
    const result = await showAlert.confirm(
      `This will permanently delete “${task.title}”.`,
      'Delete task?'
    )

    if (!result.isConfirmed) return

    try {
      setDeletingTaskId(task.id)
      await deleteTask(task.id)
      setTasks((currentTasks) => currentTasks.filter((currentTask) => currentTask.id !== task.id))
      showAlert.success('Task deleted successfully.')
    } catch (error) {
      console.error('Failed to delete task:', error)
      showAlert.error(error?.response?.data?.message || 'Unable to delete the task. Please try again.')
    } finally {
      setDeletingTaskId(null)
    }
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
        isEditing={editingTaskId !== null}
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

                      <p className="task-card-description">
                        {task.description || 'No additional details provided.'}
                      </p>

                      <div className="task-card-meta">
                        <div className="meta-item">
                          <span className="meta-label">Project:</span>
                          <span className="meta-value">{task.project || 'Unassigned'}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Due:</span>
                          <span className="meta-value">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</span>
                        </div>
                      </div>

                      <div className="task-card-meta">
                        <div className="meta-item">
                          <span className="meta-label">Priority:</span>
                          <span className="meta-value">{task.priority || 'Medium'}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Assignee:</span>
                          <span className="meta-value">{task.assignee || 'You'}</span>
                        </div>
                      </div>

                      <div className="task-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                        </div>
                        <span className="progress-text">{task.progress}%</span>
                      </div>

                      <div className="task-card-footer">
                        <span className={`status-badge status-${(task.status || 'Pending').toLowerCase().replace(' ', '-')}`}>
                          {task.status || 'Pending'}
                        </span>
                      </div>

                      <div className="task-card-actions">
                        <button className="action-icon" title="Edit" type="button" onClick={() => handleEditTask(task)}>✏️</button>
                        <button
                          className="action-icon"
                          title="Delete"
                          type="button"
                          onClick={() => handleDeleteTask(task)}
                          disabled={deletingTaskId === task.id}
                        >
                          🗑️
                        </button>
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
                            <button className="table-action-btn" title="Edit" type="button" onClick={() => handleEditTask(task)}>✏️</button>
                            <button
                              className="table-action-btn"
                              title="Delete"
                              type="button"
                              onClick={() => handleDeleteTask(task)}
                              disabled={deletingTaskId === task.id}
                            >
                              🗑️
                            </button>
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

        </div>
      </main>
    </div>
  )
}