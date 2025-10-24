import {Component, inject, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {Student} from '../../../models/student';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {BaseService} from '../../../service/base-service';
import {Group} from '../../../models/group';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-dialog-edit-wrapper',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
  ],
  templateUrl: './dialog-edit-wrapper.html',
  styleUrl: './dialog-edit-wrapper.scss'
})

export class DialogEditWrapper implements OnInit{

  editingStudent: Student

  baseService = inject(BaseService)
  allGroups = this.baseService.allGroups


  //todo с группами заеб

  constructor(public dialogRef: MatDialogRef<DialogEditWrapper>,
    @Inject(MAT_DIALOG_DATA) public data: Student)

  {
    if (data) {

      this.editingStudent = { ...data };
    } else {
      this.editingStudent = new Student(); // для Add
    }
  }

  ngOnInit() {
    this.baseService.getAllGroups()

  }

  onNoClick(){
    this.dialogRef.close()
  }



}
