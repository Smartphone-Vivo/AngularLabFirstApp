import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StudentEditor} from './components/student-editor/student-editor';
import {MatTableStudents} from './components/mat-table-students/mat-table-students';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, StudentEditor, MatTableStudents],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('firstApp');
}
