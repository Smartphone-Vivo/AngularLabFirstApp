import { Component } from '@angular/core';
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
export class TableStudents {
  students: Student[]


  constructor(private baseService: BaseService,
              public dialog: MatDialog) {
    this.students = []
  }

  ngOnInit(){
    console.log("TableStudentsComponent")
    this.students = this.baseService.getAllStudents()
  }

  addNewStudent() {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapper,
      {
        width: '350px',
        data: null
      })
  }

}
