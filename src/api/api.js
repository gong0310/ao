import axios from "./axios";
import QS from "qs";

export function findRouteList(params) {
  return axios({
    url: "api/route/list",
    method: "get",
    params: params,
  });
}
export function login(params) {
  return axios({
    url: "api/login",
    method: "get",
    params: params,
  });
}

//开票记录确认
export function confirmApplyRecordList(parameter) {
  return axios({
    url: "api/v1/mobile/invoice/confirmation",
    method: "post",
    data: QS.stringify(parameter),
  });
}
