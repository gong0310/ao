import axios from "axios";
import router from "../router/index.js";
import { Toast } from "vant";
import Vue from "vue";
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg) => {
  Toast({
    message: msg,
    duration: 3000,
    forbidClick: true,
  });
};
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      //$router.currentRoute：当前路由的路由信息对象，包含了当前匹配路由的信息
      redirect: router.currentRoute.fullPath,
    },
  });
};

const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      tip("未登录或登录状态失效");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip("登录过期，请重新登录");
      Vue.ls.remove("ACCESS_TOKEN");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    default:
      tip("接口解析错误");
      console.log(status, msg);
  }
};

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join("&");
  console.log("url=", url);
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

// 创建axios实例
var instance = axios.create({
  baseURL: "http://api-hmugo-web.itheima.net/api/",
  timeout: 1000 * 10,
  // headers: {
  //     'X-Requested-with': 'XMLHttpRequest'
  // }
});
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("status");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    removePending(config); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (resp) => {
    removePending(resp.config); // 在请求结束后，移除本次请求
    if (resp.status !== 200 || !resp.data) {
      Promise.reject(resp);
    } else {
      const retData = resp.data;
      // 检查是否有逻辑错误
      if (retData.code !== 0) {
        return Promise.reject({
          msg: `逻辑错误：${retData.code}`,
          resp,
        });
      }
      Promise.resolve(retData);
    }
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        // tip('网络开小差了~')
        return Promise.reject("网络开小差了~");
      }
      router.push("/error");
      return Promise.reject(error);
    }
  }
);

export default instance;
