import request from "@/utils/request";
import LoginData from "@/model/LoginData";

// 登录接口
export const reqLogin = (data: LoginData) => {
  return request.post('/user/login', data)
}

// 注册接口
export const reqRegister = (data: LoginData) => {
  return request.post('/user/register', data)
}