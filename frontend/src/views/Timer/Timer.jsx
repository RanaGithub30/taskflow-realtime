import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./Timer.css";
import { getAllProjects } from "../../services/projectService";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [taskTimes, setTaskTimes] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {
    if (!isRunning || !activeTaskId) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);

      setTaskTimes((previous) => ({
        ...previous,
        [activeTaskId]:
          (previous[activeTaskId] || 0) + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, activeTaskId]);

  /* =========================
     FETCH PROJECTS
  ========================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProjects();

        console.log("Projects:", data);

        if (!Array.isArray(data)) {
          throw new Error(
            "Projects API did not return an array."
          );
        }

        const formattedProjects = data.map((project) => ({
          id: project.id,
          name: project.name ?? "Unnamed Project",
          description: project.description ?? "",
          team: project.team ?? null,
          progress: project.progress ?? 0,
          status: project.status ?? "Planning",
          dueDate:
            project.dueDate ??
            project.due_date ??
            "",
          members: project.members ?? [],
          budget: project.budget ?? "$0",
          tasks:
            project.tasks ??
            project.projectTasks ??
            [],
        }));

        setProjects(formattedProjects);
      } catch (err) {
        console.error(err);

        setError(
          err?.message ||
            "Failed to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* =========================
     CURRENT PROJECT
  ========================= */

  const currentProject = projects.find(
    (project) =>
      String(project.id) ===
      String(selectedProject)
  );

  const tasks = currentProject?.tasks || [];

  /* =========================
     SELECT PROJECT
  ========================= */

  const handleProjectChange = (event) => {
    const projectId = event.target.value;

    setSelectedProject(projectId);

    setIsRunning(false);
    setActiveTaskId(null);
    setElapsedSeconds(0);
  };

  /* =========================
     START TASK
  ========================= */

  const startTask = (taskId) => {
    setActiveTaskId(taskId);
    setIsRunning(true);

    setElapsedSeconds(
      taskTimes[taskId] || 0
    );
  };

  /* =========================
     PAUSE TASK
  ========================= */

  const pauseTask = () => {
    setIsRunning(false);
  };

  /* =========================
     STOP TASK
  ========================= */

  const stopTask = () => {
    setIsRunning(false);
    setActiveTaskId(null);
    setElapsedSeconds(0);
  };

  /* =========================
     RESET
  ========================= */

  const resetTimer = () => {
    setIsRunning(false);
    setActiveTaskId(null);
    setElapsedSeconds(0);
  };

  /* =========================
     FORMAT TIME
  ========================= */

  const formatTime = (seconds) => {
    const hours = String(
      Math.floor(seconds / 3600)
    ).padStart(2, "0");

    const minutes = String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0");

    const secs = String(
      seconds % 60
    ).padStart(2, "0");

    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="team-layout">
      <Sidebar isAuthenticated={true} />
      
      <div className="main-content">

        <main>

          {/* PAGE HEADER */}

          <div className="page-header">

            <h1>
              Project Timer
            </h1>

            <p>
              Keep your work sessions on track
            </p>

            <p>
              Start and pause a timer for selected
              projects, then review recent tracking
              sessions.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="timer-error">
              {error}
            </div>
          )}

          {/* TIMER CARD */}

          <section className="timer-card">

            <div className="timer-panel">

              <div className="timer-panel-row">

                {/* PROJECT */}

                <div>

                  <label
                    className="timer-field-label"
                    htmlFor="project"
                  >
                    Select project
                  </label>

                  <select
                    id="project"
                    className="timer-select"
                    value={selectedProject}
                    onChange={
                      handleProjectChange
                    }
                  >

                    <option value="">
                      {loading
                        ? "Loading projects..."
                        : "Select a project"}
                    </option>

                    {projects.map(
                      (project) => (
                        <option
                          key={project.id}
                          value={project.id}
                        >
                          {project.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* CURRENT PROJECT */}

                <div className="timer-status-card">

                  <span className="timer-status-label">
                    Current project
                  </span>

                  <strong>
                    {currentProject?.name ||
                      "No project selected"}
                  </strong>

                </div>

              </div>

              {/* =========================
                  TASKS
              ========================= */}

              {currentProject && (

                <div
                  className="project-tasks"
                  style={{
                    marginTop: "24px",
                  }}
                >

                  <h3>
                    Tasks
                  </h3>

                  {tasks.length === 0 ? (

                    <p>
                      No tasks found for this
                      project.
                    </p>

                  ) : (

                    tasks.map((task) => {

                      const taskId =
                        task.id;

                      const time =
                        taskTimes[
                          taskId
                        ] || 0;

                      const active =
                        activeTaskId ===
                        taskId;

                      return (
                        <div
                          key={taskId}
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "space-between",
                            padding:
                              "14px",
                            marginBottom:
                              "10px",
                            border:
                              "1px solid #ddd",
                            borderRadius:
                              "8px",
                          }}
                        >

                          <div>

                            <strong>
                              {task.name ||
                                task.title ||
                                "Untitled task"}
                            </strong>

                            {task.description && (
                              <p>
                                {
                                  task.description
                                }
                              </p>
                            )}

                          </div>

                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "10px",
                            }}
                          >

                            <span
                              style={{
                                fontFamily:
                                  "monospace",
                              }}
                            >
                              {formatTime(time)}
                            </span>

                            {!active && (
                              <button
                                className="button-primary"
                                onClick={() =>
                                  startTask(
                                    taskId
                                  )
                                }
                              >
                                Start
                              </button>
                            )}

                            {active && (
                              <>
                                <button
                                  className="button-secondary"
                                  onClick={
                                    pauseTask
                                  }
                                >
                                  Pause
                                </button>

                                <button
                                  className="button-secondary"
                                  onClick={
                                    stopTask
                                  }
                                >
                                  Stop
                                </button>
                              </>
                            )}

                          </div>

                        </div>
                      );
                    })

                  )}

                </div>

              )}

              {/* TIMER */}

              <div className="timer-display">

                <p className="timer-display-label">
                  Elapsed time
                </p>

                <span className="timer-display-value">
                  {formatTime(
                    elapsedSeconds
                  )}
                </span>

              </div>

              {/* BUTTONS */}

              <div className="timer-button-group">

                <button
                  className={`button-primary ${
                    isRunning
                      ? "button-secondary"
                      : ""
                  }`}
                  onClick={() =>
                    setIsRunning(
                      (value) => !value
                    )
                  }
                  disabled={!activeTaskId}
                >
                  {isRunning
                    ? "Pause timer"
                    : "Start timer"}
                </button>

                <button
                  className="button-secondary"
                  onClick={
                    resetTimer
                  }
                >
                  Reset timer
                </button>

              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}