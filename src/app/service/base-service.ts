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

  deleteStudent(student: Student): Observable<void> {
    console.log('deleteStudent:', student.id, student.name);

    return this.http.delete<void>(`${this.studentsUrl}/${student.id}`).pipe(
      tap(() => {
        this.log = this.log.filter(s => s.id !== student.id);
      }),
    );
  }

}
