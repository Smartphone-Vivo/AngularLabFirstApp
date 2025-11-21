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
import {AuthService} from '../../../auth/auth-service';
import {GroupService} from '../../../service/group-service';
import {Teacher} from '../../../models/teacher';

@Component({
  selector: 'dialog-edit-teacher',
  templateUrl: 'dialog-edit-teacher.html',
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

})
export class DialogEditTeacher implements OnInit{
  editingTeacher: Teacher

  groupService = inject(GroupService)

  allGroups: Group[] = []
  role = inject(AuthService).getRole()
  enable = ['true', 'false']

  constructor(public dialogRef: MatDialogRef<DialogEditTeacher>,
              @Inject(MAT_DIALOG_DATA) public data: Teacher)

  {
    if (data) {

      this.editingTeacher = { ...data };
      console.log('editStudent111', this.editingTeacher)
    } else {
      this.editingTeacher = new Teacher(); // для Add
    }
  }

  ngOnInit() {
    this.getAllGroups()
    console.log('группы',this.getAllGroups())
  }

  onNoClick(){
    this.dialogRef.close()
  }

  getAllGroups(){
    return this.groupService.getAllGroups()
      .subscribe(val =>
        this.allGroups = val
      )
  }
}
