import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {BaseService} from '../../service/base-service';
import {GroupService} from '../../service/group-service';
import {Group} from '../../models/group';
import {tap} from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    FormsModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage implements OnInit{

  router= inject(Router)
  authService = inject(AuthService)
  baseService = inject(BaseService)
  groupService = inject(GroupService)

  allGroups: Group[] = []

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  form = new FormGroup(
    {
      username: new FormControl(null, Validators.required),
      fio: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      groupId: new FormControl(null),
      password: new FormControl(null, Validators.required),
      group: new FormControl(),
      role: new FormControl(),
      enable: new FormControl(),
    }
  )

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(
      value => {
        this.allGroups = value
        console.log('onInit groups', this.allGroups)
      }
    )
    console.log(this.allGroups, 'все группы')
  }

  onSubmit(event: Event) {
    console.log(this.form.value, 'группы')
    // event.preventDefault()

    this.form.value.enable = true
    this.form.value.role = 'STUDENT'

    if (this.form.valid) {
      this.authService.register(this.form.value as any)
        .subscribe(response => {
            this.router.navigate(['/login'])
            console.log(response)
          }
        )
      console.log( 'значение формы', this.form.value)
    }
    }

  toLogin() {
    console.log('toLogin')
    this.router.navigate(['/login'])
  }

  // foods: string[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];









}

