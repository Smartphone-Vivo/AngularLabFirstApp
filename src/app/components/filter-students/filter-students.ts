import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatTableStudents} from '../mat-table-students/mat-table-students';
import {MatFabButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-filter-students',
  imports: [
    FormsModule,
    MatFabButton,
    MatFormField,
    MatInput,
    MatIcon
  ],
  templateUrl: './filter-students.html',
  styleUrl: './filter-students.scss'
})
export class FilterStudents {
  title: string = "";

  isSearchButton = signal<boolean>(true)

  constructor(private matTableStudents : MatTableStudents) {}

  searchStudentsTable(){
    if(this.title != ""){
      this.isSearchButton.set(false)
      console.log("передал title", this.title)
      this.matTableStudents.loadTableWithFiltering(this.title)
    }
    else{
      this.isSearchButton.set(true)
      console.log("searchStudentsTable пстое")
    }
  }

  clearInput(){
    this.isSearchButton.set(true)
    this.title = ""
    this.matTableStudents.loadTableWithFiltering("");
  }

}
