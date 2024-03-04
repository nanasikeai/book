/**
 * 接口路由
 * @author yupi
 */
const routes = [
  {
    path: '/user/register',
    handler: require('./controller/userController').userRegisterApi,
  },
  {
    path: '/user/login',
    handler: require('./controller/userController').userLoginApi,
  },
  {
    path: '/bill/add',
    handler: require('./controller/billController').addBillApi,
  },
  {
    path: '/bill/list',
    type: 'get',
    handler: require('./controller/billController').listApi,
  },
  {
    path: '/bill/type/list',
    type: 'get',
    handler: require('./controller/billController').typeListApi,
  },
];

module.exports = routes;