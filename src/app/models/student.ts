export class Student{
  constructor() {
    this.id = null
    this.username = ""
    this.role = ""
    this.fio = ""
    this.phone_number = ""
    this.groups = {
      id: null,
      groupName: ""
    }
    this.enable = true
  }

  id: number | null
  username: string
  role: string
  fio: string
  phone_number: string
  groups: {
    id: number | null
    groupName: string
  }
  enable: boolean

}
