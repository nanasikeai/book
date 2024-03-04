
export default class User {
  username: string
  password: string
  verify?: string

  constructor (payload = {} as User) {
    this.username = payload.username
    this.password = payload.password
    this.verify = payload.verify
  }
}