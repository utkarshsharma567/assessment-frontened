import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000/api",
   baseURL: "https://assessment-backand.onrender.com/api",
  withCredentials: true, // VERY IMPORTANT for cookies
});

export default api;
