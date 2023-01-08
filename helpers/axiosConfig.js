import axios from "axios";

const instance = axios.create({
  baseURL: "http://twitter-mobile-app-backend.test/api",
});

export default instance;
