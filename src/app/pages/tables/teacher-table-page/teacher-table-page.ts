import {Component, inject} from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableStudents} from '../../../components/mat-table-students/mat-table-students';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher-table-page',
  imports: [
    MatFabButton,
    MatIconModule,
    MatTableStudents
  ],
  templateUrl: './teacher-table-page.html',
  styleUrl: './teacher-table-page.scss'
})
export class TeacherTablePage {

  cookieService = inject(CookieService)
  router = inject(Router)

  logout(){
    this.cookieService.deleteAll()
    this.router.navigate(['/login'])

  }
}
