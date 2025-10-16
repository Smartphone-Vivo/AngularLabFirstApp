import { Routes } from '@angular/router';
import {LoginPage} from './pages/login-page/login-page';
import {MatTableStudents} from './components/mat-table-students/mat-table-students';
import {canActivateAuth} from './auth/access.guard';

export const routes: Routes = [
  {path:'', component: MatTableStudents, canActivate: [canActivateAuth]},
  {path:'login', component: LoginPage},
  {path:'table', component: MatTableStudents, canActivate: [canActivateAuth]}

];
