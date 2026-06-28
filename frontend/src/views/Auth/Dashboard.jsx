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
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">Overview</p>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-description">Welcome back! Here's your tasks overview and team performance summary.</p>
          </div>
          <div className="dashboard-actions">
            <button className="button-secondary">Review report</button>
            <button className="button-primary">+ New Task</button>
          </div>
        </header>

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

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Recent Tasks</h2>
              <p className="section-description">Tasks currently being tracked across projects.</p>
            </div>
            <button className="button-secondary">View all</button>
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

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Task Distribution</h3>
              <button className="button-secondary">Details</button>
            </div>
            <div className="chart-placeholder">
              <p>📊 Task distribution chart</p>
            </div>
          </div>

          <aside className="dashboard-summary-panel panel-card">
            <h3 className="panel-title">Team Insights</h3>
            <ul className="insights-list">
              <li>John completed 3 tasks today.</li>
              <li>Sarah started a new project initiative.</li>
              <li>Mike updated documentation.</li>
            </ul>
          </aside>
        </section>
      </main>
    </div>
  )
}
