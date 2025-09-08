import {Component, Inject} from '@angular/core';
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
    MatDialogTitle
  ],
  templateUrl: './dialog-edit-wrapper.html',
  styleUrl: './dialog-edit-wrapper.scss'
})

export class DialogEditWrapper {

  editingStudent: Student

  constructor(public dialogRef: MatDialogRef<DialogEditWrapper>,
    @Inject(MAT_DIALOG_DATA) public data: Student)
  {
    this.editingStudent = new Student()
  }

  onNoClick(){
    this.dialogRef.close()
  }

}
