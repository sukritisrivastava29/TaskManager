import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanager-58nq.onrender.com",
});

export default API;