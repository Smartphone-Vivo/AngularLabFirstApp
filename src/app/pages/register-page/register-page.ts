
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {map, Observable, startWith} from 'rxjs';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-register-page',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    // MatSelect
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {

  router= inject(Router)
  authService = inject(AuthService)


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
      group: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }
  )


  onSubmit(event: Event) {

    event.preventDefault()

    if (this.form.valid) {
      this.authService.register(this.form.value as any)
        .subscribe(response => {
            this.router.navigate(['/login'])
            console.log(response)
          }
        )

      console.log(this.form.value)
    }


      console.log(this.form.value)
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

