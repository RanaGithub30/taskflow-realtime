import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import './Reports.css'

export default function Reports() {
  const [reportType, setReportType] = useState('weekly')
  const [timeframe, setTimeframe] = useState('30')

  const reportCards = [
    { title: 'Tasks completed', value: '82%', change: '+12%', trend: 'up' },
    { title: 'Team efficiency', value: '74%', change: '+8%', trend: 'up' },
    { title: 'Open issues', value: '16', change: '-4', trend: 'down' },
    { title: 'Delivery pace', value: '21 days', change: '-2', trend: 'down' },
  ]

  const reportItems = [
    { id: 1, title: 'Weekly progress overview', category: 'Performance', status: 'Delivered' },
    { id: 2, title: 'Project budget analysis', category: 'Finance', status: 'In review' },
    { id: 3, title: 'Client feedback summary', category: 'Feedback', status: 'Delivered' },
    { id: 4, title: 'Resource allocation report', category: 'Operations', status: 'Draft' },
  ]

  return (
    <div className="reports-layout">
      <Sidebar />

      <main className="reports-main">
        <header className="reports-header">
          <div>
            <p className="reports-eyebrow">Reports</p>
            <h1>Team performance reports</h1>
            <p className="reports-description">Analyze project health, progress, and team outcomes with easy-to-read reports.</p>
          </div>
          <button className="button-primary">Generate report</button>
        </header>

        <section className="reports-controls">
          <div className="reports-filter-group">
            <label>
              Report type
              <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </label>
          </div>

          <div className="reports-filter-group">
            <label>
              Time frame
              <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </label>
          </div>
        </section>

        <section className="report-cards">
          {reportCards.map((card, index) => (
            <article key={index} className="report-card">
              <div className="report-card-top">
                <p>{card.title}</p>
                <span className={`report-chip report-chip--${card.trend}`}>{card.change}</span>
              </div>
              <h2>{card.value}</h2>
            </article>
          ))}
        </section>

        <section className="reports-overview">
          <div className="reports-graph-card">
            <div className="graph-card-header">
              <div>
                <p className="graph-title">Performance trend</p>
                <p className="graph-subtitle">Visual summary of team performance over the selected time frame.</p>
              </div>
              <button className="button-secondary">Download CSV</button>
            </div>
            <div className="graph-placeholder">
              <p>📈 Chart placeholder</p>
            </div>
          </div>

          <aside className="reports-summary-panel">
            <div className="panel-card">
              <p className="panel-title">Insights</p>
              <ul className="insights-list">
                <li>Team velocity improved by 15%.</li>
                <li>Completed tasks are up 12% this period.</li>
                <li>Issue backlog reduced by 4 items.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="recent-reports">
          <div className="section-heading">
            <div>
              <h2>Recent reports</h2>
              <p>Review the latest generated reports and their statuses.</p>
            </div>
            <button className="button-tertiary">View all</button>
          </div>

          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reportItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                    <td><button className="button-secondary">Open</button></td>
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
