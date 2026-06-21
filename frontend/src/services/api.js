import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getMetadata = () => api.get("/metadata");

export const predictEvent = (data) => api.post("/predict", data);

export default api;
export const getNearestPoliceStation = (lat, lon) =>
  axios.get(
    `http://127.0.0.1:8000/nearest-police-station?lat=${lat}&lon=${lon}`
  );