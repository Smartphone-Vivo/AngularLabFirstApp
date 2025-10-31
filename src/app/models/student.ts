export class Student{
  constructor() {
    this.id = null
    this.username = ""
    this.role = ""
    this.fio = ""
    this.phoneNumber = ""
    this.group = {
      id: null,
      groupName: ""
    }
    this.enable = true
  }

  id: number | null
  username: string
  role: string
  fio: string
  phoneNumber: string
  group: {
    id: number | null
    groupName: string
  }
  enable: boolean

}
