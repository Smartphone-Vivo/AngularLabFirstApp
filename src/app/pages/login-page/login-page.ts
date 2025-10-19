import {Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {

  authService = inject(AuthService)
  router = inject(Router)

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  form = new FormGroup(
    {
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }
  )

  onSubmit(event: Event) {



    event.preventDefault()

    if (this.form.valid) {

      this.authService.login(this.form.value as any)
        .subscribe(response => {
          console.log('role',this.authService.role)
            if(this.authService.role == 'STUDENT'){
              this.router.navigate(['/student-table'])
              console.log(response)
            }
          else if(this.authService.role == 'ADMIN'){
            this.router.navigate(['/admin-table'])
            console.log(response)
          }
          else if(this.authService.role == 'TEACHER'){
            this.router.navigate(['/teacher-table'])
            console.log(response)
          }

          }
        )

      console.log(this.form.value)
    }
  }


  toRegister(){
    this.router.navigate(['/register'])
  }
}
