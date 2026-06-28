import { useEffect, useState } from "react";
import API from "./services/api";
import Navbar from "./components/Navbar";
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

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, form);
      } else {
        await API.post("/tasks", form);
      }

      setForm(emptyForm);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.split("T")[0],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;

    return searchMatch && statusMatch && priorityMatch;
  });

  return (
    <>
      <Navbar />

      <div className="container">

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

        <TaskList
          tasks={filteredTasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      </div>
    </>
  );
}

export default App;