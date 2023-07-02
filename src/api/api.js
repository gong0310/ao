import axios from "./axios";
import QS from "qs";
//开票记录
export function getApplyRecordList(parameter) {
  return axios({
    url: "api/v1/mobile/invoice/list",
    method: "get",
    params: parameter,
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
//开票记录详情
export function ApplyRecordDetail(parameter) {
  return axios({
    url: "api/v1/mobile/invoice/show",
    method: "get",
    params: parameter,
  });
}

// ======================
//开票流水确认
export function confirmApply(parameter) {
  return axios({
    url: "api/v1/mobile/invoice/save",
    method: "post",
    data: QS.stringify(parameter),
  });
}
//开票申请/流水列表
export function getWaterList(parameter) {
  return axios({
    url: "api/v1/mobile/water/list",
    method: "get",
    params: parameter,
  });
}
//流水查看
export function seeWater(parameter) {
  return axios({
    url: "api/v1/mobile/water/show",
    method: "get",
    params: parameter,
  });
}
//提交流水
export function submitWaterUp(parameter) {
  return axios({
    url: "api/v1/mobile/water/save",
    method: "post",
    data: parameter,
  });
}
//获取发票类目
export function getCates(parameter) {
  return axios({
    url: "api/v1/mobile/invoice/category/list",
    method: "get",
    params: parameter,
  });
}
//图片上传
export function UploadPic(parameter) {
  return axios({
    url: "api/v1/mobile/water/upload",
    method: "post",
    data: parameter,
  });
}
// ==========================
//抬头列表
export function getTitleLists(parameter) {
  return axios({
    url: "api/v1/mobile/title/list",
    method: "get",
    params: parameter,
  });
}
//设置默认抬头
export function setDefaultTitle(parameter) {
  return axios({
    url: "api/v1/mobile/title/modify/default",
    method: "post",
    data: QS.stringify(parameter),
  });
}
//抬头详情
export function getTitleDetail(parameter) {
  return axios({
    url: "api/v1/mobile/title/show",
    method: "get",
    params: parameter,
  });
}
//新增(更新)抬头
export function upTitle(parameter) {
  return axios({
    url: "api/v1/mobile/title/save",
    method: "post",
    data: QS.stringify(parameter),
  });
}
//删除抬头
export function deleteTitle(parameter) {
  return axios({
    url: "api/v1/mobile/title/delete",
    method: "post",
    data: QS.stringify(parameter),
  });
}
export function Login(parameter) {
  return axios({
    url: "api/v1/wechat/login",
    method: "post",
    data: QS.stringify(parameter),
  });
}
//查询是否存在
export function query(parameter) {
  return axios({
    url: "api/v1/mobile/register/query",
    method: "get",
    params: parameter,
  });
}

//获取验证码
export function getCode(parameter) {
  return axios({
    url: "api/v1/mobile/register/send/sms",
    method: "post",
    data: QS.stringify(parameter),
  });
}

//提交认证
export function auth(parameter) {
  return axios({
    url: "api/v1/mobile/register/auth",
    method: "post",
    data: QS.stringify(parameter),
  });
}

//保存银行卡信息
export function saveBankInfo(parameter) {
  return axios({
    url: "api/v1/mobile/bank/save",
    method: "post",
    data: QS.stringify(parameter),
  });
}
//退出登录
export function outLogin(parameter) {
  return axios({
    url: "api/v1/mobile/wechat/logout",
    method: "post",
    data: QS.stringify(parameter),
  });
}
//获取用户信息
export function getUserInfo(parameter) {
  return axios({
    url: "api/v1/mobile/wechat/info",
    method: "get",
    params: parameter,
  });
}
