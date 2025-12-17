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
import {Group} from '../../../models/group';
import {MatSelectModule} from '@angular/material/select';
import {AuthService} from '../../../auth/auth-service';
import {GroupService} from '../../../service/group-service';

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

  groupService = inject(GroupService)

  role = inject(AuthService).getRole()
  enable = ['true', 'false']

  groups: Group[] = [];

  constructor(public dialogRef: MatDialogRef<DialogEditWrapper>,
    @Inject(MAT_DIALOG_DATA) public data: Student)

  {
    if (data) {
      this.editingStudent = { ...data };
      console.log('editStudent111', this.editingStudent)
    } else {
      this.editingStudent = new Student();
    }
  }

  ngOnInit() {
    this.loadGroups();
    console.log('getAllGroups', this.groups)
  }

  onNoClick(){
    this.dialogRef.close()
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
        console.log('Group map создан:', this.groups);
      },
      error: (error) => {
        console.error('Ошибка загрузки групп:', error);
        this.groups = [];
      }
    });
  }
}
