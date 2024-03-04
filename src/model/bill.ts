export default class Bill {
  details: Array<{
    amount: string
    date: string
    id?: number
    pay_type: number
    remark: string
    type_id: number
    type_name: string
    createTime: string
  }>
  date: string

  constructor (payload = {} as Bill) {
    this.details = payload.details
    this.date = payload.date
  }
}