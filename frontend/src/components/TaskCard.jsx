function TaskCard({ task, handleEdit, handleDelete }) {
  const priorityClass = task.priority.toLowerCase().replace(" ", "-");
  const statusClass = task.status.toLowerCase().replace(" ", "-");

  return (
    <div className="task-card">

      <div className="card-top">
        <h3>{task.title}</h3>

        <span className={`badge priority ${priorityClass}`}>
          {task.priority}
        </span>
      </div>

      <p className="description">
        {task.description}
      </p>

      <div className="details">

        <p>
          <strong>Status:</strong>

          <span className={`badge status ${statusClass}`}>
            {task.status}
          </span>

        </p>

        <p>
          <strong>Due:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>

      </div>

      <div className="actions">

        <button
          className="edit-btn"
          onClick={() => handleEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => handleDelete(task._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;