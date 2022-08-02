import axios from "axios";

const URL = process.env.REACT_APP_URL;

const headers = {
  "Content-Type": "application/json",
};

export const login = async (payload) => {
  try {
    const { data } = await axios.post(`${URL}v1/admin/auth/`, payload, headers);
    localStorage.setItem("stackstudioToken", data.token);
    return true
  } catch (error) {
    return false
  }
};

export const logout = () => {
  // clear localstorage
  localStorage.removeItem("stackstudioToken")
};
