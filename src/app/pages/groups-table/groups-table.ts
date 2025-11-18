import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BaseService} from '../../service/base-service';
import {Group} from '../../models/group';
import {MatButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatTableStudents} from '../../components/mat-table-students/mat-table-students';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-groups-table',
  imports: [MatTableModule, MatButton, MatIconModule, MatSidenav, MatSidenavContainer, MatSidenavContent, MatTableStudents],
  templateUrl: './groups-table.html',
  styleUrl: './groups-table.scss'
})
export class GroupsTable implements OnInit{
  baseService = inject(BaseService)
  allGroups = this.baseService.getAllGroups()
  displayedColumns: string[] = ['id', 'groupName'];

  dataSource = new MatTableDataSource<Group>()
  router = inject(Router)

  ngOnInit() {
    this.loadGroups()
  }

  loadGroups(){
      this.dataSource.data = this.baseService.allGroups
  }

  toGroupsTable(){
    this.router.navigate(['/groups-table'])
  }

  toStudentsTable(){
    this.router.navigate(['/admin-table'])
  }
}
