const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const ComError = require('./exception/index')

const app = express();
// 用于获取body参数
app.use(express.json())
// 设置跨域
app.use(cors());
// 复杂请求仍然需要设置跨域
app.all('*', (req, res, next) => {
  // 开启跨域
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


const setRoute = (path, handlerFunction) => {
  const handler = async (req, res) => {
    let result
    const event = req.body;
    try {
      result = await handlerFunction(event, req, res)
    } catch (e) {
      console.log('e', e)
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
  app.post(path, handler)
}
// 注册路由接口
for (const route of routes) {
  setRoute(route.path, route.handler)
}

app.listen('3000', () => {
  console.log('端口启动，3000')
})