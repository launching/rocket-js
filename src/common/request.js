import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "@/router";
import _ from "lodash";
// import { UserModule } from '@/store/modules/user'

// let token = localStorage.getItem("ROCKET");

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  withCredentials: true, // send cookies when cross-domain requests
  headers: { "Content-Type": "application/json" },
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      return JSON.stringify(data);
    },
  ],
});

// Request interceptors
// Add X-Access-Token header to every request, you can add other custom headers here
// if (UserModule.token) {
// config.headers['X-Access-Token'] = UserModule.token;
// }

service.interceptors.request.use(
  config => {
    config.headers["X-Access-Token"] = "admin";
    config.headers["Content-Type"] = "application/json";
    const { url } = config;

    let token = localStorage.getItem("ROCKET");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.dir(url);
      console.dir(router);
      if (url !== "/login") {
        router.push({ name: "login" });
        throw new Error("token is null");
      }
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  response => {
    const { baseURL, url } = response.config;
    const res = response.data;
    const path = url.split(baseURL)[1];

    let token;
    if (path === "/login") {
      token = res.token;
      localStorage.setItem("ROCKET", token);
    }
    return response.data;
  },
  error => {
    Message({
      message: _.get(error, "response.data.message") || error.message,
      type: "error",
      duration: 5 * 1000,
    });
    if (_.get(error, "response.status") === 401) {
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default service;
