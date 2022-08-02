import axios from "axios";

const URL = process.env.REACT_APP_URL;

const headers = {
  "Content-Type": "application/json",
};

export const fetchData = async (path) => {
  return await axios.get(`${URL}${path}`);
};

export const postData = async (path, payload) => {
    return await axios.post(`${URL}${path}`, payload, headers);
};
