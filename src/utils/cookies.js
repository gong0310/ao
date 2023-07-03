import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 }); // 7 天后失效
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}