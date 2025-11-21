import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import {MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {FilterStudents} from '../filter-students/filter-students';
import {AuthService} from '../../auth/auth-service';
import {UserInfo} from '../user-info/user-info';
import {Group} from '../../models/group';
import {GroupService} from '../../service/group-service';
import {map} from 'rxjs';

@Component({
  selector: 'mat-table-students',
  styleUrl: 'mat-table-students.scss',
  templateUrl: 'mat-table-students.html',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule, MatIcon, FormsModule, FilterStudents, UserInfo],
})
export class MatTableStudents implements OnInit, AfterViewInit {

  pageSize = 5;
  currentPage = 0;
  defaultName = ""
  sortBy = "id,asc"
  userId = inject(AuthService).getMe()
  baseService = inject(BaseService)
  groupService = inject(GroupService)

  allGroups = this.groupService.getAllGroups()
  authService = inject(AuthService)

  role = inject(AuthService).getRole()

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Student>([]);

  constructor(
    public dialog: MatDialog
  ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  logout(){
    this.authService.logout()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageSize = event.pageSize
      this.currentPage = event.pageIndex

      this.dataSource.sort = this.sort;

      this.loadTableWithFiltering(this.defaultName);
    });
  }

  ngOnInit() {
    this.loadTableWithFiltering(this.defaultName);

    console.log('getAllGroups', this.allGroups)
  }

  checkRole(){
    if(this.role != 'STUDENT'){
      return this.displayedColumns = ['id', 'username', 'fio', 'group', 'phoneNumber', 'actions']
    }
    else{
      return this.displayedColumns = ['id', 'username','fio', 'group', 'phoneNumber']
    }
  }

  loadTableWithFiltering(name : string){

    console.log(this.role, 'роль - loadTableWithFiltering')

    this.checkRole()
    this.defaultName = name
    console.log("loadtablewithfiltering", this.currentPage, this.pageSize)
    this.baseService.getFilteringStudents(name, this.userId, this.currentPage, this.pageSize, this.sortBy)
      .subscribe((response : any) =>{
          this.dataSource.data = response.content
          this.paginator.length = response.totalElements
      }
      )
  }

  addNewStudent() {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '350px',
      data: null
    })

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result.fio != '') {
        // result.groupId = result.group.id
        result.group.groupName = ''

        result.role = 'STUDENT'

        this.baseService.addNewStudent(result).subscribe(() => {
          this.loadTableWithFiltering(this.defaultName);
        })
      }
    })
  }

  deleteStudent(student: Student) {
    this.baseService.deleteStudent(student).subscribe(() => {
      this.loadTableWithFiltering(this.defaultName);
    })
  }

  editStudent(student: Student) {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '350px',
      data: {...student}
    });

    dialogRef.afterClosed().subscribe((result: Student) => {

        this.baseService.editStudent(result).subscribe(() => {

          console.log('11111111111result' ,result)
          this.loadTableWithFiltering(this.defaultName);
        });

    });
  }

  announceSortChange(sortState: Sort) {
    this.sortBy = `${sortState.active},${sortState.direction}`
    this.loadTableWithFiltering(this.defaultName);
  }

}
