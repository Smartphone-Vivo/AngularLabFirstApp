import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableStudents} from '../../../components/mat-table-students/mat-table-students';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth-service';

@Component({
  selector: 'app-teacher-table-page',
  imports: [
    MatIconModule,
    MatTableStudents
  ],
  templateUrl: './teacher-table-page.html',
  styleUrl: './teacher-table-page.scss'
})
export class TeacherTablePage {

  cookieService = inject(CookieService)
  router = inject(Router)
  authService = inject(AuthService)

  logout(){
    this.authService.logout()
  }
}
