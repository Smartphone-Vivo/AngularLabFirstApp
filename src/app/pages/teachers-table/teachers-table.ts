import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatInput} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from '../../auth/auth-service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSortHeader, Sort} from '@angular/material/sort';
import {BaseService} from '../../service/base-service';
import {GroupService} from '../../service/group-service';
import {Student} from '../../models/student';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {DialogEditWrapper} from '../../components/student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import {MatChip} from '@angular/material/chips';
import {Teacher} from '../../models/teacher';
import {Group} from '../../models/group';
import {map, pipe, tap} from 'rxjs';
import {DialogEditTeacher} from './dialog-edit-teacher/dialog-edit-teacher';

@Component({
  selector: 'app-teachers-table',
  imports: [
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    FormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatFormFieldModule,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconModule,
    MatInput,
    MatRow,
    MatRowDef,
    MatSidenavContent,
    MatTable,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatHeaderCellDef,
    MatChip
  ],
  templateUrl: './teachers-table.html',
  styleUrl: './teachers-table.scss'
})
export class TeachersTable implements OnInit, AfterViewInit{

  router = inject(Router)
  authService = inject(AuthService)

  pageSize = 5;
  currentPage = 0;
  defaultName = ""
  sortBy = "id,asc"
  userId = inject(AuthService).getMe()
  baseService = inject(BaseService)
  groupService = inject(GroupService)


  allGroups = this.groupService.getAllGroups()

  role = inject(AuthService).getRole()

  displayedColumns: string[] = ['id', 'username', 'fio', 'group', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);

  readonly dialog = inject(MatDialog);

  constructor(
    // public dialog: MatDialog
  ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

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


  loadTableWithFiltering(name : string){

    console.log(this.role, 'роль - loadTableWithFiltering')

    this.defaultName = name
    console.log("loadtablewithfiltering", this.currentPage, this.pageSize)
    this.baseService.getFilteringTeachers(name, this.currentPage, this.pageSize, this.sortBy)
      .subscribe((response : any) =>{
          console.log('loadTeachersTable', response.content)
          this.dataSource.data = response.content
          this.paginator.length = response.totalElements
        }
      )
  }

  addNewTeacher() {
    const dialogRef = this.dialog.open(DialogEditTeacher, {
      width: '350px',
      data: null
    })

    dialogRef.afterClosed().subscribe((result: Teacher) => {
      if (result.fio != '') {
        result.role = 'TEACHER'
        this.baseService.addNewTeacher(result).subscribe(() => {
          this.loadTableWithFiltering(this.defaultName);
        })
      }
    })
  }

  deleteTeacher(teacher: Teacher) {
    this.baseService.deleteTeacher(teacher).subscribe(() => {
      this.loadTableWithFiltering(this.defaultName);
    })
  }

  editTeacher(teacher: Teacher) {
    const dialogRef = this.dialog.open(DialogEditTeacher, {
      width: '350px',
      data: {...teacher}
    });

    dialogRef.afterClosed().subscribe((result: Teacher) => {

      this.baseService.editTeacher(result).subscribe(() => {

        console.log('11111111111result' ,result)
        this.loadTableWithFiltering(this.defaultName);
      });

    });
  }

  announceSortChange(sortState: Sort) {
    this.sortBy = `${sortState.active},${sortState.direction}`
    this.loadTableWithFiltering(this.defaultName);
  }


  logout(){
    this.authService.logout()
  }

  toStudentsTable(){
    this.router.navigate(['/admin-table'])
  }

  toGroupsTable(){
    this.router.navigate(['/groups-table'])
  }

  toTeachersTable(){
    this.router.navigate(['/teachers-table'])
  }
}
