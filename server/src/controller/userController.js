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
  return await userLogin(username, password, req)
}

module.exports = {
  userRegisterApi,
  userLoginApi
}