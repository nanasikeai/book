const BillModel = require('../model/bill')
const moment = require('moment');
const dict = require('../config/dict')

/**
 * 新增账单
 * @param pay_type
 * @param amount
 * @param date
 * @param type_id
 * @param type_name
 * @param remark
 * @param req
 * @return {Promise<null|*>}
 */
async function addBill(pay_type, amount, date, type_id, type_name, remark) {
  // console.log(pay_type, amount, date, type_id, type_name, remark)
}

/**
 * 查询账单
 * @param date
 * @param page
 * @param page_size
 * @param type_id
 * @param req
 * @return {Promise<null|*>}
 */
async function list(date, page, page_size, type_id, req) {
  // 获取当前用户
  const { id: user_id } = req.auth
  // 根据分页设置偏移量
  const offset = (page - 1) * page_size
  // 设置查询条件
  const whereCondition = {
    user_id
  }
  if (type_id) {
    whereCondition.type_id = type_id; // 如果type_id有值，添加到查询条件中
  }
  const list = await BillModel.findAndCountAll({
    where: whereCondition,
    limit: parseInt(page_size),
    offset,
  })
  // 格式化数据，将其变成前端需要的对象格式
  let listMap = list.rows.reduce((curr, { dataValues }) => {
    dataValues.createTime = moment(dataValues.createTime).utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
    if (curr && curr.length && curr.findIndex(item => item.date == dataValues.date) > -1) {
      const index = curr.findIndex(item => item.date == dataValues.date)
      curr[index].details.push(dataValues)
    }
    // 如果在累加的数组中找不到当前项日期的，那么再新建一项。
    if (curr && curr.length && curr.findIndex(item => item.date == dataValues.date) == -1) {
      curr.push({
        date: dataValues.date,
        details: [dataValues]
      })
    }
    // 如果 curr 为空数组，则默认添加第一个账单项 item ，格式化为下列模式
    if (!curr.length) {
      curr.push({
        date: dataValues.date,
        details: [dataValues]
      })
    }
    return curr
  }, []).sort((a, b) => moment(b.date) - moment(a.date))
  return listMap
}

/**
 * 获取账单类型枚举值
 */
async function typeList() {
  return dict
}

module.exports = {
  addBill,
  list,
  typeList
}