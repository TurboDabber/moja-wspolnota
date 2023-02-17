import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReligiousCenterModel } from 'src/app/models/add-religious-center-model';
import { ReligionTypeModel } from 'src/app/models/religion-type-model';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-add-religious-center-modal',
  templateUrl: './add-religious-center-modal.component.html',
  styleUrls: ['./add-religious-center-modal.component.scss']
})
export class AddReligiousCenterModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddReligiousCenterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddReligiousCenterModel,
    private httpClientService: HttpClientService
  ) {}

  protected religionTypes: ReligionTypeModel[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {
    await this.getReligionTypes();
    console.log(this.religionTypes);
  }

  protected getReligionTypes(): void {
    this.httpClientService.getAllReligionTypes().subscribe(response => {
      console.log('Religion types pulled successfully:', response);
      this.religionTypes = response;
    }, error => {
      console.error('Error getting religion types:', error);
    });
  }
}
