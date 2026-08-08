export default function TaskModalFields({ values, onChange, projectOptions, errors, showDeadline = true }) {
  const today = new Date().toISOString().split('T')[0]
  const selectedProject = values.project || projectOptions[0] || ''

  return (
    <>
      <label className="modal-field">
        <span>Select Project</span>
        <select name="project" value={selectedProject} onChange={onChange} disabled={projectOptions.length === 0}>
          {projectOptions.length === 0 ? (
            <option value="">No projects available</option>
          ) : (
            projectOptions.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))
          )}
        </select>
        {errors.project && <div className="field-error">{errors.project}</div>}
      </label>

      <label className="modal-field">
        <span>Task name</span>
        <input
          name="title"
          type="text"
          value={values.title}
          onChange={onChange}
          placeholder="Enter task name"
        />
        {errors.title && <div className="field-error">{errors.title}</div>}
      </label>

      <div className="modal-row">
        <label className="modal-field">
          <span>Priority</span>
          <select name="priority" value={values.priority} onChange={onChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && <div className="field-error">{errors.priority}</div>}
        </label>

        {showDeadline && (
          <label className="modal-field">
            <span>Deadline</span>
            <input
              name="deadline"
              type="date"
              value={values.deadline}
              onChange={onChange}
              min={today}
            />
            {errors.deadline && <div className="field-error">{errors.deadline}</div>}
          </label>
        )}
      </div>

      <label className="modal-field">
        <span>Status</span>
        <select name="status" value={values.status} onChange={onChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && <div className="field-error">{errors.status}</div>}
      </label>
    </>
  )
}
