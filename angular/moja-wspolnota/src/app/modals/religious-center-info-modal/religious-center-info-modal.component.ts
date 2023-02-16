import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReligiousCenterModel } from 'src/app/models/religious-center-model';

@Component({
  selector: 'app-religious-center-info-modal',
  templateUrl: './religious-center-info-modal.component.html',
  styleUrls: ['./religious-center-info-modal.component.scss']
})
export class ReligiousCenterInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ReligiousCenterInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReligiousCenterModel
  ) {}
}
