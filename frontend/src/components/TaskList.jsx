import TaskCard from "./TaskCard";

function TaskList({ tasks, handleEdit, handleDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h2>📭 No Tasks Found</h2>
        <p>Create your first task or adjust the filters.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;