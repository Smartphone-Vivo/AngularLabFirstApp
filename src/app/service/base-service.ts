import {inject, Injectable, OnInit} from '@angular/core';
import {Student} from '../models/student';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, firstValueFrom, map, Observable, tap, throwError} from "rxjs";
import {MatTableStudents} from '../components/mat-table-students/mat-table-students';
import {Group} from '../models/group';
import {AuthService} from '../auth/auth-service';

@Injectable({
  providedIn: 'root'
})
export class BaseService implements OnInit{

  private springUrl = 'http://localhost:8080/api/base/students'

  authService = inject(AuthService)

  allGroups: Group[] = []



  constructor(private http: HttpClient) {}
  ngOnInit() {

  }

  getFilteringStudents(name : string, userId : string, pageNumber: number, pageSize: number, sortBy: string){
    const role = this.authService.getRole().toLowerCase()
    console.log(role, 'Роль')
    return this.http.get<Student[]>(`http://localhost:8080/api/${role}/${userId}/${pageNumber}/${pageSize}?name=${name}&sort=${sortBy}`)
  }

  getCurrentUser(id : string){
    const role = this.authService.getRole().toLowerCase()
    return this.http.get<Student>(`http://localhost:8080/api/${role}/me`)
  }

  addNewStudent(student:Student): Observable<Student>{
    console.log('addNewStudent', student.fio, student.id)
    //student.id = "5"
    return this.http.post<Student>('http://localhost:8080/api/auth/register', student);
  }

  deleteStudent(student: Student): Observable<Student> {
    const role = this.authService.getRole().toLowerCase()
    console.log('deleteStudent:', student.id, student.fio);
    return this.http.delete<Student>(`http://localhost:8080/api/${role}/students/${student.id}`)
  }

  editStudent(student: Student){
    console.log('editStudent')
    const role = this.authService.getRole().toLowerCase()
    return this.http.put<Student>(`http://localhost:8080/api/${role}/me`, student)
  }

  getAllGroups(){
    if(this.allGroups.length == 0){
      return this.http.get<Group[]>(`http://localhost:8080/api/auth/group`).subscribe((val : Group[]) =>{
          this.allGroups.push(...val)
          console.log(val, 'группы')
        }
      )
    }
    else{
      console.log(this.allGroups, 'baseservice not empty')
      return this.allGroups
    }

  }

  addNewGroup(group: Group){
    console.log('addNewGroup', group)
    const role = this.authService.getRole().toLowerCase()
    return this.http.post<Group>(`http://localhost:8080/api/${role}/group`, group)
  }
}
