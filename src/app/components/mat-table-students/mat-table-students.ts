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

/**
 * @title Table with pagination
 */
@Component({
  selector: 'mat-table-students',
  styleUrl: 'mat-table-students.scss',
  templateUrl: 'mat-table-students.html',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule, MatIcon, FormsModule, MatInput, MatFormField],
})
export class MatTableStudents implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);

  totalItems = 0;
  pageSize = 5;
  currentPage = 0;


  constructor(
    private baseService: BaseService,
    public dialog: MatDialog
  ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    // Подписываемся на события пагинатора
    this.paginator.page.subscribe((event: PageEvent) => {
      // event.pageIndex - новая страница (0, 1, 2...)
      // event.pageSize - сколько элементов на странице
      this.loadTableWithPagination(event.pageIndex, event.pageSize);
      this.pageSize = event.pageSize
      this.currentPage = event.pageIndex
    });
  }


  ngOnInit() {
    // this.loadTable()
    this.loadTableWithPagination(this.currentPage, this.pageSize);
  }

  loadTableWithFiltering(name : string){
    this.baseService.getFilteringStudents(name)
      .subscribe(response =>
      this.dataSource.data = response
      )
  }

  loadTableWithPagination(pageIndex: number, pageSize: number) {
    // Конвертируем в номера страниц для сервера (+1)
    const pageNumber = pageIndex;

    this.baseService.getStudentsWithPagination(pageNumber, pageSize)

      .subscribe(response => {
        this.dataSource.data = response.content; // Данные для таблицы
        this.paginator.length = response.totalElements; // Всего элементов
      });
  }



  addNewStudent() {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '350px',
      data: null
    })

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result.fio != '' && result.group != '') {
        this.baseService.getAllStudents().subscribe()
        this.baseService.addNewStudent(result).subscribe(() => {
          // this.loadTable()
          this.loadTableWithPagination(this.currentPage, this.pageSize)
        })
      }
    })
  }

  deleteStudent(student: Student) {
    this.baseService.deleteStudent(student).subscribe(() => {
      // this.loadTable()
      this.loadTableWithPagination(this.currentPage, this.pageSize)
    })
  }

  editStudent(student: Student) {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '350px',
      data: {...student}   // копия, чтобы не портить данные напрямую
    });

    dialogRef.afterClosed().subscribe((result: Student | undefined) => {
      if (result && result.fio && result.group) {
        this.baseService.editStudent(result).subscribe(() => {
          // this.loadTable()
          this.loadTableWithPagination(this.currentPage, this.pageSize)
        });
      }
    });
  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  title: string = "";


  searchStudentsTable(){
    if(this.title != ""){
      console.log("передал title", this.title)
      this.loadTableWithFiltering(this.title)
    }
    else{
      console.log("searchStudentsTable (empty)")
      this.loadTableWithPagination(this.currentPage, this.pageSize);
    }

  }

}
