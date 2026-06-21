import axios from "axios";

const API_BASE_URL = "https://gridlock-phase-2.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMetadata = () => api.get("/metadata");

export const predictEvent = (data) => api.post("/predict", data);

export const getNearestPoliceStation = (lat, lon) =>
  api.get(`/nearest-police-station?lat=${lat}&lon=${lon}`);

export default api;