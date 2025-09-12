import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const students = [
      {id: 1, name: 'Игорь', surname: 'Гофман'},
      {id: 2, name: 'Игорь', surname: 'Гофман2'},
      {id: 3, name: 'Игорь', surname: 'Гофман3'}
    ];
    return {students}
  }

  genId(students:Student[]){
    return students.length > 0 ? Math.max(...students.map(student => student.id ? student.id : 0)) + 1 : 1;
  }

}
