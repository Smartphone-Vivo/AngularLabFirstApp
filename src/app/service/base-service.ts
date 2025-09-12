import {Injectable, OnInit} from '@angular/core';
import {Student} from '../models/student';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService implements OnInit{

  log: Student[] = []
    private studentsUrl = 'api/students'

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentsUrl)
  }

  addNewStudent(student:Student): Observable<Student>{
    console.log('addNewStudent')
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }

  deleteStudent(student: Student): Observable<Student> {
    console.log('deleteStudent:', student.id, student.name);

    return this.http.delete<Student>(`api/students/${student.id}`).pipe()
  }

  editStudent(student: Student){
    return this.http.put<Student>(`api/students/${student.id}`, student)
  }

}
