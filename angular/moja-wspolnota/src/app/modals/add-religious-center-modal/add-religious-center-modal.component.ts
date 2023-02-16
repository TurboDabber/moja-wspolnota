import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReligiousCenterModel } from 'src/app/models/add-religious-center-model';

@Component({
  selector: 'app-add-religious-center-modal',
  templateUrl: './add-religious-center-modal.component.html',
  styleUrls: ['./add-religious-center-modal.component.scss']
})
export class AddReligiousCenterModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddReligiousCenterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddReligiousCenterModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
