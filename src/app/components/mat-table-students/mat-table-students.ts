import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {FilterStudents} from '../filter-students/filter-students';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'mat-table-students',
  styleUrl: 'mat-table-students.scss',
  templateUrl: 'mat-table-students.html',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule, MatIcon, FormsModule, MatInput, MatFormField, FilterStudents],
})
export class MatTableStudents implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);

  pageSize = 5;
  currentPage = 0;
  defaultName = ""
  sortBy = "id,asc"
  sortType = ""

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
      console.log("изменения пагинатора", this.currentPage, this.pageSize)
    });
  }


  ngOnInit() {
    this.loadTableWithFiltering(this.defaultName);
  }

  loadTableWithFiltering(name : string){
    this.defaultName = name
    console.log("loadtablewithfiltering", this.currentPage, this.pageSize)
    this.baseService.getFilteringStudents(name, this.currentPage, this.pageSize, this.sortBy)
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
      if (result.fio != '' && result.group != '') {
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

    dialogRef.afterClosed().subscribe((result: Student | undefined) => {
      if (result && result.fio && result.group) {
        this.baseService.editStudent(result).subscribe(() => {
          this.loadTableWithFiltering(this.defaultName);
        });
      }
    });
  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log("sort", sortState.direction, sortState.active)

    this.sortBy = `${sortState.active},${sortState.direction}`
    console.log(this.sortBy)
    this.loadTableWithFiltering(this.defaultName);


    // if (sortState.direction) {
    //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    // } else {
    //   this._liveAnnouncer.announce('Sorting cleared');
    // }
  }

}
