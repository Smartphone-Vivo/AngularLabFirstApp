import {Component, inject, OnInit} from '@angular/core';
import {BaseService} from '../../service/base-service';
import {AuthService} from '../../auth/auth-service';
import {Student} from '../../models/student';
import {MatIconModule} from "@angular/material/icon";
import {DialogEditWrapper} from "../student-editor/dialog-edit-wrapper/dialog-edit-wrapper";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-info',
    imports: [
        MatIconModule
    ],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss'
})
export class UserInfo implements OnInit{

  baseService = inject(BaseService)
  authService = inject(AuthService)
    userId = this.authService.getMe()
    currentUser: Student = {} as Student

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.loadData()
    }

    editStudent(student: Student) {
        const dialogRef = this.dialog.open(DialogEditWrapper, {
            width: '350px',
            data: {...student}
        });

        dialogRef.afterClosed().subscribe((result: Student) => {
            this.baseService.editCurrentUser(result).subscribe({
                next: () => {
                    this.loadData()
                }
            });
        });
    }
    loadData(){
        this.baseService.getCurrentUser(this.userId).subscribe(user => {
            this.currentUser = user
            console.log('userInfo', this.currentUser)
        })
    }
}
