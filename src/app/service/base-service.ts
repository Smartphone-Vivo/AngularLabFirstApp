import {Injectable, OnInit} from '@angular/core';
import {Student} from '../models/student';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService implements OnInit{
  students: Student[] = [
      {id: 1, name: 'Игорь', surname: 'Гофман'},
      {id: 2, name: 'Игорь', surname: 'Гофман2'},
      {id: 3, name: 'Игорь', surname: 'Гофман3'}
  ]

    private studentsUrl = 'api/students'

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  getAllStudents(): Observable<Student[]>{
    console.log('count of students' + this.students.length)
    return this.http.get<Student[]>(this.studentsUrl)
  }

  addNewStudent(student:Student): Observable<Student>{
    console.log('addNewStudent')
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }


}

