import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatTableStudents} from './components/mat-table-students/mat-table-students';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('firstApp');
}
