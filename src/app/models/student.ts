export class Student{
  constructor() {
    this.id = null
    this.username = ""
    this.role = ""
    this.fio = ""
    this.phoneNumber = ""
    this.groupId = null
    this.groups = {
      id: null,
      groupName: ""
    }
    this.enable = true
    this.password = ""
  }

  id: number | null
  username: string
  role: string
  fio: string
  phoneNumber: string
  groupId: number | null
  groups: {
    id: number | null
    groupName: string
  }
  enable: boolean
  password: string

}
