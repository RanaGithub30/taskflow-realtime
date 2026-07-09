import { useState } from "react";

export default function NewProjectModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    team: "",
    status: "Planning",
    budget: "",
    dueDate: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // TODO: Save project here

    onClose();
  };

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Create New Project</h2>

          <button style={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project Name</label>
            <input
              style={styles.input}
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={{ ...styles.input, ...styles.textarea }}
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description"
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Team</label>
              <input
                style={styles.input}
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Frontend"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                style={styles.input}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Planning</option>
                <option>Active</option>
                <option>Review</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Budget ($)</label>
              <input
                style={styles.input}
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="5000"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Due Date</label>
              <input
                style={styles.input}
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.footer}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.saveBtn}
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "650px",
    maxWidth: "90%",
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,.2)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "14px",
    borderBottom: "1px solid #e5e7eb",
  },

  closeBtn: {
    border: "none",
    background: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#64748b",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "18px",
    flex: 1,
  },

  label: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #dbe3f0",
    background: "#f8fbff",
    fontSize: "0.95rem",
    color: "#0f172a",
    outline: "none",
    transition: "all 0.2s ease",
  },

  textarea: {
    resize: "vertical",
    minHeight: "110px",
  },

  row: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px",
  },

  cancelBtn: {
    padding: "10px 20px",
    border: "1px solid #dbe3f0",
    borderRadius: "12px",
    cursor: "pointer",
    background: "#fff",
    color: "#334155",
    fontWeight: "600",
  },

  saveBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    background: "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
    color: "#fff",
    fontWeight: "600",
    boxShadow: "0 10px 20px rgba(67, 56, 202, 0.18)",
  },
};