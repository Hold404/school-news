import axios from "axios";

const userConfig = {
  baseURL: 'http://localhost:4000/api/v1/user',
  headers: {
    'Content-Type': 'application/json'
  }
}


const defaultConfig = {
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
}

export const userInstance = axios.create(userConfig);
export const defaultInstance = axios.create(defaultConfig);