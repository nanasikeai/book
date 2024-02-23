const ComError = require('../exception/index')
const {
  REQUEST_PARAMS_ERROR_CODE,
} = require("../exception/errorCode");
const {
  userRegister,
  userLogin
} = require('../service/userService')

/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */

async function userRegisterApi(event, req, res) {
  const { username, password } = event
  return await userRegister(username, password, req)
}

/**
 * 用户登录
 * @param event
 * @param req
 * @param res
 */

async function userLoginApi(event, req, res) {
  const { username, password } = event
  if (!username || !password) {
    throw new ComError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userLogin(username, password, req)
}

module.exports = {
  userRegisterApi,
  userLoginApi
}