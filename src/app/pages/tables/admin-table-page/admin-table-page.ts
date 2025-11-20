import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTableStudents} from '../../../components/mat-table-students/mat-table-students';
import {AuthService} from '../../../auth/auth-service';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-admin-table-page',
  imports: [
    MatIconModule,
    MatTableStudents,
    MatButton,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './admin-table-page.html',
  styleUrl: './admin-table-page.scss'
})
export class AdminTablePage {

  cookieService = inject(CookieService)
  router = inject(Router)
  authService = inject(AuthService)

  logout(){
    this.authService.logout()
  }



  toGroupsTable(){
    this.router.navigate(['/groups-table'])
  }

  toTeachersTable(){
    this.router.navigate(['/teachers-table'])
  }
}
