import {Component, inject} from '@angular/core';
import {BaseService} from '../../service/base-service';
import {AuthService} from '../../auth/auth-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Student} from '../../models/student';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss'
})
export class UserInfo {

  baseService = inject(BaseService)
  authService = inject(AuthService)
  // editingStudent : Student = null

  form = new FormGroup(
    {
      id: new FormControl<number | null>(null, Validators.required),
      username: new FormControl<string | null>(null, Validators.required),
      fio: new FormControl<string | null>(null, Validators.required),
      phoneNumber: new FormControl<string | null>(null, Validators.required),
      groups: new FormControl<string | null>(null, Validators.required),

    }
  )

  getCurrentUser(){
    this.baseService.getCurrentUser(this.authService.getMe())
      .subscribe(val => {
          this.form.patchValue({
            id: val.id,
            username: val.username,
            fio: val.fio,
            phoneNumber: val.phoneNumber,
            // groups: val.group
          })
        }
      )
  }

}
