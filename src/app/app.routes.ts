import { Routes } from '@angular/router';
import {LoginPage} from './pages/login-page/login-page';
import {canActivateAuth} from './auth/access.guard';
import {RegisterPage} from './pages/register-page/register-page';
import {AdminTablePage} from './pages/tables/admin-table-page/admin-table-page';
import {StudentTablePage} from './pages/tables/student-table-page/student-table-page';
import {TeacherTablePage} from './pages/tables/teacher-table-page/teacher-table-page';

export const routes: Routes = [
  {path:'student-table', component: StudentTablePage, canActivate: [canActivateAuth]},
  {path:'admin-table', component: AdminTablePage, canActivate: [canActivateAuth]},
  {path:'teacher-table', component: TeacherTablePage, canActivate: [canActivateAuth]},
  {path:'login', component: LoginPage},
  {path:'', component: LoginPage},
  {path:'register', component: RegisterPage},



];
