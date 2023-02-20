import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddAnnouncmentModel } from 'src/app/models/add-announcment-model';

@Component({
  selector: 'app-add-announcment-modal',
  templateUrl: './add-announcment-modal.component.html',
  styleUrls: ['./add-announcment-modal.component.scss']
})
export class AddAnnouncmentModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddAnnouncmentModel>,
    @Inject(MAT_DIALOG_DATA) public data: AddAnnouncmentModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {

  }
}
