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
  public selectedFileName: string = '';
  selectedFiles: File| undefined;
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

  onImageSelected(event: any) {
    const file = event.target.files[0];
  
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('Plik może być PNG lub JPG.');
      return;
    }
    this.selectedFileName = file.name;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        this.data.image = canvas.toDataURL('image/png');
      };
    };
  
    reader.readAsDataURL(file);
  }
}
