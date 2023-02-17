import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReligionTypeModel } from 'src/app/models/add-religion-type-model';
import { ReligionTypeModel } from 'src/app/models/religion-type-model';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-add-religion-type-modal',
  templateUrl: './add-religion-type-modal.component.html',
  styleUrls: ['./add-religion-type-modal.component.scss']
})
export class AddReligionTypeModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddReligionTypeModel>,
    @Inject(MAT_DIALOG_DATA) public data: AddReligionTypeModel,
    private httpClientService: HttpClientService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {

  }
}
