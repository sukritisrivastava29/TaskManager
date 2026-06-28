function TaskForm({
  form,
  handleChange,
  handleSubmit,
  editingTask,
}) {
  return (
    <div className="form-card">
      <h2>{editingTask ? "✏️ Edit Task" : "➕ Add New Task"}</h2>

      <form className="task-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div className="row">

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />

        <button className="submit-btn">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

      </form>
    </div>
  );
}

export default TaskForm;