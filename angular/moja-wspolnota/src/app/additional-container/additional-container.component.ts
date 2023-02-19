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
  public loggedUserId: string  | null = null;
  public isLoggedUser: boolean = false;
  ngOnInit(): void {
    this.markersService.religiousCenterClicked.subscribe(center => {
      console.log('Received new religious center:', center);
      this.chosenReligionCentre=center;
      
      const userId = localStorage.getItem("user_id") ?? '';
      this.loggedUserId= userId;
      this.isLoggedUser=false;
      if(userId)
      {
        this.isLoggedUser=true;
      }
      this.cdr.detectChanges(); // ngif was not detecting changes so this manually trigger change detection
    });
  }

  onAddReligiousCenter(newReligiousCenter: ReligiousCenterModel | null) {
    console.log('Received new religious center:', newReligiousCenter);
  }

  public isOwnerOfReligiousCenter(): boolean {
    console.log(this.loggedUserId !== null && this.chosenReligionCentre !== null &&
      this.loggedUserId === this.chosenReligionCentre.user_id.toString())
    return this.loggedUserId !== null && this.chosenReligionCentre !== null &&
    this.loggedUserId === this.chosenReligionCentre.user_id.toString();
  }
}
