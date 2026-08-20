import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { getAllTasks } from '../../services/taskService'
import { apiGet } from '../../services/api'
import './Dashboard.css'

const getProjectName = (project) => {
  if (project && typeof project === 'object') {
    return project.name || project.title || 'Unassigned'
  }

  return project || 'Unassigned'
}

const normalizeTasks = (data) => (Array.isArray(data) ? data : []).map((task) => ({
  id: task.id,
  title: task.title || 'Untitled task',
  project: getProjectName(task.project),
  priority: task.priority || 'Medium',
  status: task.status || 'Pending',
  assignee: task.assignee || 'You',
}))

export default function Dashboard() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [teamMembers, setTeamMembers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadDashboard = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        const [taskData, teamsResponse] = await Promise.all([
          getAllTasks(),
          apiGet('/teams').catch(() => null),
        ])

        if (!isMounted) return

        setTasks(normalizeTasks(taskData))
        const teams = teamsResponse?.data?.data ?? []
        setTeamMembers(teams.reduce((total, team) => total + Number(team.member_count ?? team.members?.length ?? 0), 0))
      } catch (error) {
        if (!isMounted) return
        console.error('Failed to load dashboard data:', error)
        setLoadError('Unable to load your dashboard data. Please refresh and try again.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadDashboard()
    return () => { isMounted = false }
  }, [])

  const stats = useMemo(() => [
    { label: 'Total Tasks', value: tasks.length, icon: '✓', color: '#4338ca' },
    { label: 'In Progress', value: tasks.filter((task) => task.status === 'In Progress').length, icon: '⌛', color: '#6366f1' },
    { label: 'Completed', value: tasks.filter((task) => task.status === 'Completed').length, icon: '✓', color: '#10b981' },
    // { label: 'Team Members', value: teamMembers, icon: '👥', color: '#f59e0b' },
  ], [tasks, teamMembers])

  const recentTasks = tasks.slice(0, 5)

  return (
    <div className="dashboard-layout">
      <Sidebar isAuthenticated={true} />

      <main className="dashboard-main">
        <section className="dashboard-stats" aria-busy={isLoading}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-header">
                <span className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                  {stat.icon}
                </span>
                <p className="stat-label">{stat.label}</p>
              </div>
              <p className="stat-value" style={{ color: stat.color }}>
                {isLoading ? '—' : stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Recent Tasks</h2>
              <p className="section-description">Your five most recently created tasks.</p>
            </div>
            <button className="button-secondary" type="button" onClick={() => navigate('/tasks')}>View all</button>
          </div>

          {loadError ? (
            <p className="dashboard-feedback dashboard-feedback--error">{loadError}</p>
          ) : isLoading ? (
            <p className="dashboard-feedback">Loading dashboard data…</p>
          ) : recentTasks.length === 0 ? (
            <div className="dashboard-empty-state">
              <p>No tasks yet. Create your first task to see it here.</p>
              <button className="button-secondary" type="button" onClick={() => navigate('/tasks')}>Go to Tasks</button>
            </div>
          ) : (
            <div className="tasks-table-wrapper">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task Title</th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned to</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.map((task) => (
                    <tr key={task.id}>
                      <td className="task-title">{task.title}</td>
                      <td className="task-project">{task.project}</td>
                      <td><span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                      <td><span className={`badge badge-${task.status.toLowerCase().replaceAll(' ', '-')}`}>{task.status}</span></td>
                      <td className="task-assignee">{task.assignee}</td>
                      <td className="task-action">
                        <button className="action-btn" type="button" onClick={() => navigate('/tasks')}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
