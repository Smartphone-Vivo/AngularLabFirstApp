import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import {MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {FilterStudents} from '../filter-students/filter-students';
import {AuthService} from '../../auth/auth-service';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs';
import {Group} from '../../models/group';
import {UserInfo} from '../user-info/user-info';

/**
 * @title Table with pagination
 */
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
  sortType = ""
  userId = inject(AuthService).getMe()

  cookieService = inject(CookieService)

  role = inject(AuthService).getRole()

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Student>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);



  constructor(
    private baseService: BaseService,
    public dialog: MatDialog
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
      // console.log("изменения пагинатора", this.currentPage, this.pageSize)
    });
  }

  //todo при обновлении после логина табличка ломается

  ngOnInit() {
    this.loadTableWithFiltering(this.defaultName);

  }

  checkRole(){
    if(this.role == 'ADMIN'){
      return this.displayedColumns = ['id', 'username', 'fio', 'group', 'phoneNumber', 'actions']
    }
    else if (this.role == 'STUDENT'){
      return this.displayedColumns = ['id', 'username','fio', 'group', 'phoneNumber']
    }
    else{
      return this.displayedColumns = ['id', 'username', 'fio', 'group']
    }

  }

  loadTableWithFiltering(name : string){

    console.log(this.role, 'роль - loadTableWithFiltering')

    this.checkRole()
    this.defaultName = name
    console.log("loadtablewithfiltering", this.currentPage, this.pageSize)
    this.baseService.getFilteringStudents(name, this.userId, this.currentPage, this.pageSize, this.sortBy)
      .subscribe((response : any) =>{
          console.log('ответ',response.content)
          this.dataSource.data = response.content

          console.log('жимолость', this.dataSource.data, response.content)
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
    console.log('че в edit отправили')
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '350px',
      data: {...student}
    });


    dialogRef.afterClosed().subscribe((result: Student) => {
      console.log('из диалогэдита пришло',result)
      //    dialogRef.afterClosed().subscribe((result: Student | undefined) => {
      // if (result && result.fio && result.group) {
      //
      //   this.baseService.editStudent(result).subscribe(() => {
      //     this.loadTableWithFiltering(this.defaultName);
      //   });
      // }

        this.baseService.editStudent(result).subscribe(() => {
          this.loadTableWithFiltering(this.defaultName);
          // console.log(result, 'че из эдита получаем')
        });

    });
  }



  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    // console.log("sort", sortState.direction, sortState.active)

    this.sortBy = `${sortState.active},${sortState.direction}`
    // console.log(this.sortBy)
    this.loadTableWithFiltering(this.defaultName);


    // if (sortState.direction) {
    //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    // } else {
    //   this._liveAnnouncer.announce('Sorting cleared');
    // }
  }

}
