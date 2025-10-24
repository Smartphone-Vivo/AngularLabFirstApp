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

  private springUrl = 'http://localhost:8080/api/base/students'

  allGroups: Group[] = []

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

  getAllGroups(){
    if(this.allGroups.length == 0){
      return this.http.get<Group[]>(`http://localhost:8080/api/base/group`).subscribe((val : Group[]) =>{
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
}
