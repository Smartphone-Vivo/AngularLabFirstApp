import {Component, inject, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

import {Group} from '../../../models/group';
import {MatSelectModule} from '@angular/material/select';
import {AuthService} from '../../../auth/auth-service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'dialog-edit-group',
  templateUrl: 'dialog-edit-group.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatSelectModule,
    MatIconModule,
  ],

})
export class DialogEditGroup{
  editingGroup: Group

  role = inject(AuthService).getRole()

  constructor(public dialogRef: MatDialogRef<DialogEditGroup>,
              @Inject(MAT_DIALOG_DATA) public data: Group) {
    this.editingGroup = {...data}
  }

  onNoClick(){
    this.dialogRef.close()
  }

}
