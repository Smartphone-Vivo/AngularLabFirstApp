import { Injectable } from '@angular/core';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  students: Student[] = [
      {id: 1, name: 'Игорь', surname: 'Гофман'},
      {id: 2, name: 'Игорь', surname: 'Гофман2'},
      {id: 3, name: 'Игорь', surname: 'Гофман3'}
  ]

  constructor() {}

  getAllStudents(): Student[]{
    console.log('count of students' + this.students.length)
    return this.students;
  }
  addNewStudent(student:Student){
    console.log('addNewStudent')
    this.students.push(student)
  }


}

