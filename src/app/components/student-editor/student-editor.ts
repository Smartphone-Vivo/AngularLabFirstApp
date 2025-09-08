import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';

@Component({
  selector: 'app-student-editor',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './student-editor.html',
  styleUrl: './student-editor.scss'
})
export class StudentEditor implements OnInit{
  editingStudent : Student;

  constructor(private baseService: BaseService) {
    this.editingStudent = new Student()
  }

  ngOnInit(){}

  addStudent(){
    this.baseService.addNewStudent(this.editingStudent)
    this.editingStudent = new Student()
  }

}
