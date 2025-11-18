import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BaseService} from '../../service/base-service';
import {Group} from '../../models/group';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatTableStudents} from '../../components/mat-table-students/mat-table-students';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../../auth/auth-service';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';



@Component({
  selector: 'app-groups-table',
  imports: [MatTableModule, MatButton, MatIconModule, MatSidenav, MatSidenavContainer, MatSidenavContent, MatTableStudents, MatFabButton, FormsModule, MatFormField, MatInput],
  templateUrl: './groups-table.html',
  styleUrl: './groups-table.scss'
})
export class GroupsTable implements OnInit{

  baseService = inject(BaseService)
  allGroups = this.baseService.getAllGroups()
  displayedColumns: string[] = ['id', 'groupName', 'actions'];
  authService = inject(AuthService)

  dataSource = new MatTableDataSource<Group>()
  router = inject(Router)

  newGroup = new Group()

  title: string = "";

  ngOnInit() {
    this.loadGroups()
  }

  logout(){
    this.authService.logout()
  }

  loadGroups(){
    this.baseService.getAllGroups().subscribe(val => {
        this.dataSource.data = val
      }
    )
  }

  toGroupsTable(){
    this.router.navigate(['/groups-table'])
  }

  toStudentsTable(){
    this.router.navigate(['/admin-table'])
  }

  addNewGroup(){
    if(this.title != ""){
      console.log(this.title)

      this.newGroup.groupName = this.title
      this.newGroup.id = null

      this.baseService.addNewGroup(this.newGroup).subscribe(
        this.loadGroups
      )
    }

  }

  editGroup() {

  }

  deleteGroup() {

  }
}
