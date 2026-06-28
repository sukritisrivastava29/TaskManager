import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    toast.error("Failed to create task.");
    res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.log(err);
    toast.error("Failed to update task.");
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task Deleted" });
  } catch (err) {
    console.log(err);
    toast.error("Failed to delete task.");
    res.status(400).json({ message: err.message });
  }
};