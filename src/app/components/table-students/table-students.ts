import {Component, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-table-students',
  imports: [
    AsyncPipe
  ],
  templateUrl: './table-students.html',
  styleUrl: './table-students.scss'
})
export class TableStudents implements OnInit{
  students$!: Observable<Student[]>

  constructor(
    private baseService: BaseService,
    public dialog: MatDialog) {
  }

  loadTable() {
    this.students$ = this.baseService.getAllStudents()
  }

  ngOnInit(){
    // this.baseService.getAllStudents().subscribe(data => this.students = data)
    this.loadTable()
    console.log("TableStudentsComponent")
  }

  addNewStudent() {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapper,
      {
        width: '350px',
        data: null
      })

    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if(result != null){
        console.log('adding new student:' + result.name)
        this.baseService.addNewStudent(result).subscribe(() => this.loadTable())
      }
    })
  }



}
