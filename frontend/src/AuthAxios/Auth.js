import axios from "axios";

const authaxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

const productAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

export { authaxios , productAxios};
