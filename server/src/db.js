const { Sequelize } = require('sequelize')
const { dbConfig } = require('./config/dbConfig') // config for database connection

/**
 * 创建数据库实例
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: "mysql",
  logging: console.log,
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL client connected");
  })
  .catch((e) => {
    console.error("Unable to connect to MySQL", e);
  });

module.exports = sequelize;