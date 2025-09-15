import {Injectable, OnInit} from '@angular/core';
import {Student} from '../models/student';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, firstValueFrom, map, Observable, tap, throwError} from "rxjs";
import {MatTableStudents} from '../components/mat-table-students/mat-table-students';

@Injectable({
  providedIn: 'root'
})
export class BaseService implements OnInit{

  log: Student[] = []
    private studentsUrl = 'api/students'
    private jsonServerUrl = 'http://localhost:3000/students'


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.jsonServerUrl)

  }



  addNewStudent(student:Student): Observable<Student>{
    console.log('addNewStudent', student.name, student.id)
    //student.id = "5"
    return this.http.post<Student>(this.jsonServerUrl, student).pipe();
  }

  deleteStudent(student: Student): Observable<Student> {
    console.log('deleteStudent:', student.id, student.name);
    return this.http.delete<Student>(`${this.jsonServerUrl}/${student.id}`)
  }

  editStudent(student: Student){
    return this.http.put<Student>(`${this.jsonServerUrl}/${student.id}`, student)
  }

}
