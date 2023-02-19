import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReviewModel } from 'src/app/models/add-review-model';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './add-review-modal.component.html',
  styleUrls: ['./add-review-modal.component.scss']
})
export class AddReviewModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddReviewModel>,
    @Inject(MAT_DIALOG_DATA) public data: AddReviewModel,
    private httpClientService: HttpClientService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {

  }
}
