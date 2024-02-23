const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserModel = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createTime: {
    type: DataTypes.DATE,
  },
  updateTime: {
    type: DataTypes.DATE,
  },
  avatar: {
    type: DataTypes.STRING,
  }
})

module.exports = UserModel;