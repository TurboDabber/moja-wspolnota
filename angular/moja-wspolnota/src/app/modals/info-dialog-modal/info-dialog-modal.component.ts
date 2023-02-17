import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog-modal',
  templateUrl: './info-dialog-modal.component.html',
  styleUrls: ['./info-dialog-modal.component.scss']
})
export class InfoDialogModal {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogModal>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
