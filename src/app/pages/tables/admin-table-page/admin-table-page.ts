import {Component, inject} from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTableStudents} from '../../../components/mat-table-students/mat-table-students';

@Component({
  selector: 'app-admin-table-page',
  imports: [
    MatFabButton,
    MatIconModule,
    MatTableStudents
  ],
  templateUrl: './admin-table-page.html',
  styleUrl: './admin-table-page.scss'
})
export class AdminTablePage {

  cookieService = inject(CookieService)
  router = inject(Router)

  logout(){
    this.cookieService.deleteAll()
    this.router.navigate(['/login'])

  }
}
