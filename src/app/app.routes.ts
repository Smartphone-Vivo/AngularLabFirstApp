import { Routes } from '@angular/router';
import {LoginPage} from './pages/login-page/login-page';
import {MatTableStudents} from './components/mat-table-students/mat-table-students';
import {canActivateAuth} from './auth/access.guard';
import {TablePage} from './pages/table-page/table-page';
import {RegisterPage} from './pages/register-page/register-page';

export const routes: Routes = [
  {path:'table', component: TablePage, canActivate: [canActivateAuth]},
  {path:'', component: TablePage, canActivate: [canActivateAuth]},
  {path:'login', component: LoginPage},
  {path:'register', component: RegisterPage},



];
