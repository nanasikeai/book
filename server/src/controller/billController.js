const ComError = require('../exception/index')
const {
  REQUEST_PARAMS_ERROR_CODE,
} = require("../exception/errorCode");
const {
  addBill,
  list,
  typeList
} = require('../service/billService')

/**
 * 新增账单
 * @param event
 * @param req
 * @param res
 */
async function addBillApi(event, req, res) {
  const {
    pay_type,
    amount,
    date,
    type_id,
    remark = ''
  } = event
  if (!pay_type || !amount || !date || !type_id) {
    throw new ComError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await addBill(pay_type, amount, date, type_id, remark, req)
}

/**
 * 获取账单列表
 * @param date
 * @param page
 * @param page_size
 * @param type_id
 */
async function listApi(event, req, res) {
  const {
    date,
    page = 1,
    page_size = 5,
    type_id
  } = event
  return await list(date, page, page_size, type_id, req)
}

/**
 * 获取账单类型枚举值
 */
async function typeListApi(event, req, res) {
  return await typeList()
}

module.exports = {
  addBillApi,
  listApi,
  typeListApi
}