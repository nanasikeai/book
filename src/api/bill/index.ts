import request from "@/utils/request";

// 获取账单列表
export const reqBillList = (data: any) => {
  return request.get('/bill/list', {
    params: data
  })
}

// 获取账单类型枚举值
export const reqTypeList = () => {
  return request.get('/bill/type/list')
}