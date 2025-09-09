import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Student} from '../../models/student';
import {BaseService} from '../../service/base-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditWrapper} from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'mat-table-students',
  styleUrl: 'mat-table-students.scss',
  templateUrl: 'mat-table-students.html',
  imports: [MatTableModule, MatPaginatorModule],
})
export class MatTableStudents implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  students!: Student[]

  constructor(private baseService: BaseService,
              public dialog: MatDialog) {
    this.students = []
    console.log('пиво1', ELEMENT_DATA)
    this.baseService.getAllStudents().subscribe(data => this.students = data)
    console.log('пиво1.9')
    console.log('пиво2', this.students)
  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.baseService.getAllStudents().subscribe(data => this.students = data)
    console.log("TableStudentsComponent")
  }

  addNewStudent() {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapper,
      {
        width: '350px',
        data: null
      })

    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if(result != null){
        console.log('adding new student:' + result.name)
        this.baseService.addNewStudent(result).subscribe(k=>
          this.baseService.getAllStudents().subscribe(data => this.students = data))
          console.log('пиво4', this.students)
      }
    })
  }


  loadTable() {

  }




}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
