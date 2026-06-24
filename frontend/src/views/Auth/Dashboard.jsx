import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import './Dashboard.css'

export default function Dashboard() {
  const [stats] = useState([
    { label: 'Total Tasks', value: '48', icon: '✓', color: '#4338ca' },
    { label: 'In Progress', value: '12', icon: '⏳', color: '#6366f1' },
    { label: 'Completed', value: '32', icon: '✔️', color: '#10b981' },
    { label: 'Team Members', value: '6', icon: '👥', color: '#f59e0b' },
  ])

  const [recentTasks] = useState([
    { id: 1, title: 'Design dashboard layout', project: 'TaskFlow', priority: 'High', status: 'In Progress', assignee: 'You' },
    { id: 2, title: 'Setup API endpoints', project: 'Backend', priority: 'High', status: 'In Progress', assignee: 'John' },
    { id: 3, title: 'Write unit tests', project: 'Backend', priority: 'Medium', status: 'Pending', assignee: 'Sarah' },
    { id: 4, title: 'Database optimization', project: 'Infrastructure', priority: 'Medium', status: 'Completed', assignee: 'Mike' },
    { id: 5, title: 'Update documentation', project: 'Docs', priority: 'Low', status: 'Pending', assignee: 'Alex' },
  ])

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's your tasks overview.</p>
          </div>
          <button className="dashboard-btn-primary">+ New Task</button>
        </header>

        {/* Stats Grid */}
        <section className="dashboard-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                  {stat.icon}
                </span>
                <p className="stat-label">{stat.label}</p>
              </div>
              <p className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Recent Tasks */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <a href="/tasks" className="section-link">View all →</a>
          </div>

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
                {recentTasks.map(task => (
                  <tr key={task.id}>
                    <td className="task-title">{task.title}</td>
                    <td className="task-project">{task.project}</td>
                    <td>
                      <span className={`badge badge-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="task-assignee">{task.assignee}</td>
                    <td className="task-action">
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Task Distribution</h3>
            <div className="chart-placeholder">
              <p>📊 Task distribution chart</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Team Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-avatar">JD</div>
                <div className="activity-details">
                  <p className="activity-name">John Doe</p>
                  <p className="activity-time">Completed 3 tasks today</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">SM</div>
                <div className="activity-details">
                  <p className="activity-name">Sarah Miller</p>
                  <p className="activity-time">Started new project</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">MJ</div>
                <div className="activity-details">
                  <p className="activity-name">Mike Johnson</p>
                  <p className="activity-time">Updated documentation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
