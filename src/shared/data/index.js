import axios from "axios";

const URL = process.env.REACT_APP_URL;
const token = localStorage.getItem("stackstudioToken");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${token}`,
};

export const fetchData = async (path) => {
  return await axios.get(`${URL}${path}`, { headers });
};

export const postData = async (path, payload) => {
  return await axios.post(`${URL}${path}`, payload, { headers });
};

export const updateData = async (path, payload) => {
  return await axios.patch(`${URL}${path}`, payload, { headers });
};

export const deleteData = async (path) => {
  return await axios.delete(`${URL}${path}`, { headers });
};
