// api.js

import axios from "axios";

const api = axios.create({
  // baseURL: "http://13.213.208.92:7080/ecssms/api/",
  baseURL: "http://13.213.208.92:8082/ecsstudent/api/",
  // baseURL: "https://artylearning.com/artylearning/api/",
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // const token = sessionStorage.getItem("token");
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQb29tYSIsImlhdCI6MTcxNzQ3ODczMiwiZXhwIjoxNzIyNjYyNzMyfQ.PoBXHDb73Y2xPy35n4LEatxalIw81z_j0duTfuY8m7ocMKTon4FW5sF_L__KH50JCTp6QAEp3JQ_usie4-pLjQ"

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
