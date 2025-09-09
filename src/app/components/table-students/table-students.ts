import {Component, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';

@Component({
  selector: 'app-table-students',
  imports: [],
  templateUrl: './table-students.html',
  styleUrl: './table-students.scss'
})
export class TableStudents implements OnInit{
  students: Student[]

  constructor(private baseService: BaseService,
              public dialog: MatDialog) {
    this.students = []
  }

  ngOnInit(){
    this.baseService.getAllStudents().subscribe(data => this.students = data)
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
        this.baseService.addNewStudent(result).subscribe(k=>
        this.baseService.getAllStudents().subscribe(data => this.students = data))
      }
    })
  }


  loadTable() {

  }
}
