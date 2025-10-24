import {Injectable, OnInit} from '@angular/core';
import {Student} from '../models/student';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, firstValueFrom, map, Observable, tap, throwError} from "rxjs";
import {MatTableStudents} from '../components/mat-table-students/mat-table-students';
import {Group} from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class BaseService implements OnInit{

  log: Student[] = []
    private studentsUrl = 'api/students'
    private jsonServerUrl = 'http://localhost:3000/students'
    private mokkyDevUrl = 'https://d63e978222e08987.mokky.dev/students/'
    private springUrl = 'http://localhost:8080/api/base/students'
    // ссылка для пагинатора https://d63e978222e08987.mokky.dev/students/?page=1&limit=3
    // Spring пагинатор https://localhost:8080/api/base/students?page=0&size=5
    // Spring пагинатор   https://localhost:8080/api/base/students?page=1&size=5
  constructor(private http: HttpClient) {}
  ngOnInit() {
  }

  getFilteringStudents(name : string, pageNumber: number, pageSize: number, sortBy: string){
    return this.http.get<Student[]>(`http://localhost:8080/api/base/students/${pageNumber}/${pageSize}?name=${name}&sort=${sortBy}`)
  }


  addNewStudent(student:Student): Observable<Student>{
    console.log('addNewStudent', student.fio, student.id)
    //student.id = "5"
    return this.http.post<Student>(this.springUrl, student);
  }

  deleteStudent(student: Student): Observable<Student> {
    console.log('deleteStudent:', student.id, student.fio);
    return this.http.delete<Student>(`${this.springUrl}/${student.id}`)
  }

  editStudent(student: Student){
    console.log('editStudent')
    return this.http.put<Student>(`${this.springUrl}`, student)
  }

  getAllGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`http://localhost:8080/api/base/group`)
  }
}
