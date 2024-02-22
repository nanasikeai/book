/**
 * 用户注册
 * @param username
 * @param password
 * @param req
 * @return {Promise<null|*>}
 */

async function userRegister(username, password, req) {
  console.log('用户登录', username, password)
  return new Promise((resolve, reject) => {
    resolve('登录成功')
  })
}

/**
 * 用户登录
 * @param username
 * @param password
 * @param req
 * @return {Promise<null|*>}
 */

async function userLogin(username, password, req) {
  console.log('用户登录', username, password)
  return new Promise((resolve, reject) => {
    resolve('登录成功')
  })
}

module.exports = {
  userRegister,
  userLogin
}