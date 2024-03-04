const express = require('express')
const routes = require('./routes')
const cors = require('cors')  
const ComError = require('./exception/index')
const { expressjwt } = require('express-jwt')

const app = express();

// 用于获取body参数
app.use(express.json())

// 设置跨域
app.use(cors())
app.all('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const origin = req.get("Origin");
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", '*');
  }
  // 允许跨域请求的方法
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE, PUT"
  );
  // 允许跨域请求 header 携带哪些东西
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since"
  );
  next();
})

// 解析jwt
app.use(
  expressjwt({ secret: 'nana', algorithms: ["HS256"] }).unless({
    path: ['/user/login', '/user/register'],
  })
);

app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    res.status(401);
    return res.send({
      code: 401,
      message: "无效的token",
    });
  }
  res.status(500);
  res.send({
    code: 500,
    message: "未知的错误",
  });
});

const setRoute = (path, handlerFunction, type = 'post') => {
  const handler = async (req, res) => {
    let result
    const event = type === 'get' ? req.query : req.body
    try {
      result = await handlerFunction(event, req, res)
      // 封装响应
      result = {
        code: 200,
        data: result,
      };
    } catch (e) {
      console.log(e)
      // 全局异常处理
      if (e instanceof ComError) {
        result = {
          code: e.code,
          message: e.message,
          data: null,
        };
      } else {
        result = {
          code: 500,
          data: null,
          message: "server error",
        };
      }
    }
    res.send(result);
  }
  type === 'get' ? app.get(path, handler) : app.post(path, handler)
}
// 注册路由接口
for (const route of routes) {
  setRoute(route.path, route.handler, route.type)
}

app.listen('3000', () => {
  console.log('端口启动，3000')
})