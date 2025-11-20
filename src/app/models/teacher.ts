import {Group} from './group';

export class Teacher{
  constructor() {
    this.id = null
    this.username = ""
    this.role = ""
    this.fio = ""
    this.phoneNumber = ""
    this.groupId = null
    this.groups = []
    this.enable = true
    this.password = ""
  }

  id: number | null
  username: string
  role: string
  fio: string
  phoneNumber: string
  groupId: number | null
  groups: Group []
  enable: boolean
  password: string

}
