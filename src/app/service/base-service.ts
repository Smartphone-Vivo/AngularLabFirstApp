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
    private mokkyDevUrl = 'https://d63e978222e08987.mokky.dev/students/'


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.mokkyDevUrl)

  }



  addNewStudent(student:Student): Observable<Student>{
    console.log('addNewStudent', student.name, student.id)
    //student.id = "5"
    return this.http.post<Student>(this.mokkyDevUrl, student).pipe();
  }

  deleteStudent(student: Student): Observable<Student> {
    console.log('deleteStudent:', student.id, student.name);
    return this.http.delete<Student>(`${this.mokkyDevUrl}${student.id}`)
  }

  editStudent(student: Student){
    return this.http.put<Student>(`${this.mokkyDevUrl}${student.id}`, student)
  }

}
