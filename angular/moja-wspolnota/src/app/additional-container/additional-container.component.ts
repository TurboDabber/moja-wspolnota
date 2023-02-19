import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ReligiousCenterModel } from '../models/religious-center-model';
import { MarkersService } from '../services/markers.service';

@Component({
  selector: 'app-additional-container',
  templateUrl: './additional-container.component.html',
  styleUrls: ['./additional-container.component.scss']
})
export class AdditionalContainerComponent implements OnInit {
  constructor(private markersService: MarkersService, private cdr: ChangeDetectorRef){}
  public chosenReligionCentre: ReligiousCenterModel | null = null;
  public religionCentreUserId: string | null = null;
  public userId: string  | null = null;
  public religionCentreName: string  | null = null;
  public activeReligionCentreId: string | null = null;
  ngOnInit(): void {
    this.markersService.religiousCenterClicked.subscribe(center => {
      console.log('Received new religious center:', center);
      this.chosenReligionCentre=center;
      this.cdr.detectChanges(); // ngif was not detecting changes so this manually trigger change detection
    });
    this.religionCentreUserId = localStorage.getItem('religion_centre_user_id');
    this.userId = localStorage.getItem('user_id');
    window.addEventListener('storage', (event: StorageEvent) => {
      console.log("aaaa")
      if (event.key === 'religion_centre_user_id') {
        this.religionCentreUserId = event.newValue;
      } else if (event.key === 'user_id') {
        this.userId = event.newValue;
      } else if (event.key === 'religion_centre_name') {
        this.religionCentreName = event.newValue;
      } else if (event.key === 'active_religion_centre_id') {
        this.activeReligionCentreId = event.newValue;
      }      
    });
  }

  onAddReligiousCenter(newReligiousCenter: ReligiousCenterModel | null) {
    console.log('Received new religious center:', newReligiousCenter);
  }
}
