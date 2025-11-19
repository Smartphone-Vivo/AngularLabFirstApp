import {ChangeDetectionStrategy, Component, Inject, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {GroupsTable} from '../groups-table';
import {Group} from '../../../models/group';

class DialogData {
}

@Component({
  selector: 'app-dialog-edit-group',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './dialog-edit-group.html',
  styleUrl: './dialog-edit-group.scss'
})
export class DialogEditGroup {
  newGroup = new Group()
  groupName: string

  groupsTable = inject(GroupsTable)

  constructor(
    public dialogRef: MatDialogRef<DialogEditGroup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.groupName = data.groupName;
  }

  onNoClick() {
    this.dialogRef.close()
  }

  updateGroup(groupName: string) {
    // this.newGroup.groupName = groupName
    // this.groupsTable.editGroup(this.newGroup)
    this.dialogRef.close(this.groupName)
  }

}
