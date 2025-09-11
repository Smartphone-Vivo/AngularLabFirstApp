import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'mat-table-students',
  styleUrl: 'mat-table-students.scss',
  templateUrl: 'mat-table-students.html',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule],
})
export class MatTableStudents implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'surname'];
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


  ngOnInit() {
    this.loadTable()
  }

  loadTable() {
    this.baseService.getAllStudents().subscribe(students => {
      this.dataSource.data = students
    })
  }


  addNewStudent() {
    const dialogRef = this.dialog.open(DialogEditWrapper, {
      width: '350px',
      data: null
    })

    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result) {
        this.baseService.addNewStudent(result).subscribe(() => {
          this.loadTable()
        })
      }
    })


  }
}
