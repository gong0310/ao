import { v4 as uuidv4 } from "uuid";
import clone from "clone";
import dayjs from "dayjs";
import Cookies from "js-cookie";

/**
 * 深度copy
 * @param {Object} obj 原对象
 */
export const deepClone = function (obj) {
  return clone(obj);
};

/**
 * unix时间戳格式化
 * @param timestamp unix时间戳
 * @returns 格式化后的字符串
 */
export const timestamp2String = function (timestamp) {
  return dayjs.unix(timestamp).format("YYYY/MM/DD HH:mm:ss");
};

/**
 * 时间戳格式化(毫秒)
 * @param timestamp unix时间戳
 * @returns 格式化后的字符串
 */
export const millisecondTimestampString = function (timestamp) {
  return dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss");
};

/**
 * 取uuid
 * @returns 随机uuid
 */
export const getUId = function () {
  return uuidv4().split("-")[0] + new Date().getTime() + getRandom(10);
};

/**
 * 获取指定位数的随机数
 * @param num 随机数长度
 * @returns 随机数
 */
export const getRandom = function (num) {
  const random = Math.floor(
    (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1)
  );
  return random;
};

/**
 * 暂停
 * @param {Number} ms 超时事件-毫秒
 */
export const timeout = function (ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};

const TokenKey = "Admin-Token";

/**
 * 获取token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * 设置token
 * @param string token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 }); // 7 天后失效
}

/**
 * 移除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
