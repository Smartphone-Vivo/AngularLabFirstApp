import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatTableStudents} from './components/mat-table-students/mat-table-students';
import {FilterStudents} from './components/filter-students/filter-students';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatTableStudents, FilterStudents],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('firstApp');
}
