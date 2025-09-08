import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StudentEditor} from './components/student-editor/student-editor';
import {TableStudents} from './components/table-students/table-students';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, StudentEditor, TableStudents],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('firstApp');
}
