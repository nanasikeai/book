const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const BillModel = sequelize.define('bill', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  pay_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pay_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  type_name: {
    type: DataTypes.STRING,
  },
  remark: {
    type: DataTypes.STRING,
  },
  createTime: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'bill',
  timestamps: false
})

module.exports = BillModel;