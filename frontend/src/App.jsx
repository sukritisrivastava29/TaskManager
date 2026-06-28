import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "./services/api";

import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import DashboardCards from "./components/DashboardCards";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

function App() {
  const emptyForm = {
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  };

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, form);
        toast.success("Task updated successfully!");
      } else {
        await API.post("/tasks", form);
        toast.success("Task created successfully!");
      }

      setForm(emptyForm);
      setEditingTask(null);

      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate.split("T")[0],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?"))
      return;

    try {
      await API.delete(`/tasks/${id}`);

      toast.success("Task deleted successfully!");

      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" ||
      task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      searchMatch &&
      statusMatch &&
      priorityMatch
    );
  });

  return (
    <>
      <div className="top-bar">
        <Navbar />

        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>

      <DashboardCards tasks={tasks} />

      <main className="container">
        <TaskForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingTask={editingTask}
        />

        <FilterBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

     <div className="tasks-header">
  <h2>Tasks</h2>

  {filteredTasks.length > 0 && (
    <span className="tasks-count">
      {filteredTasks.length} Task{filteredTasks.length !== 1 ? "s" : ""}
    </span>
  )}
</div>

        {loading ? (
          <div className="empty-state">
            <h2>Loading Tasks...</h2>
            <p>Please wait while we fetch your tasks.</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        pauseOnHover
        theme={darkMode ? "dark" : "colored"}
      />
    </>
  );
}

export default App;