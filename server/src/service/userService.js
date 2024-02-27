const UserModel = require("../model/user");
const {
  NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");
const ComError = require('../exception/index')
const jwt = require("jsonwebtoken");

/**
 * 用户注册
 * @param username
 * @param password
 * @param req
 * @return {Promise<null|*>}
 */

async function userRegister(username, password, req) {
  console.log('用户注册')
}

/**
 * 用户登录
 * @param username
 * @param password
 * @param req
 * @return {Promise<null|*>}
 */

async function userLogin(username, password, req) {
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      username,
      password,
    },
  });
  if (!user) {
    throw new ComError(NOT_FOUND_ERROR_CODE, "用户不存在或密码错误");
  }
  // 登录成功
  const secureUser = {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
  }
  const secretKey = 'nana'
  const tokenStr = 'Bearer ' + jwt.sign(secureUser, secretKey, {
    expiresIn: '50s'
  })
  secureUser.token = tokenStr
  return secureUser
}

module.exports = {
  userRegister,
  userLogin
}