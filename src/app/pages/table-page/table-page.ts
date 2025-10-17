import {Component, inject} from '@angular/core';
import {MatTableStudents} from '../../components/mat-table-students/mat-table-students';
import {MatButton, MatFabButton} from '@angular/material/button';
import {FilterStudents} from '../../components/filter-students/filter-students';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-table-page',
  imports: [
    MatTableStudents,
    MatButton,
    FilterStudents,
    MatFabButton,
    MatIconModule
  ],
  templateUrl: './table-page.html',
  styleUrl: './table-page.scss'
})
export class TablePage {

  cookieService = inject(CookieService)
  router = inject(Router)

  logout(){
    this.cookieService.deleteAll()
    this.router.navigate(['/login'])

  }
}
