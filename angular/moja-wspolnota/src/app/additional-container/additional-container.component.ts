import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddReligionTypeModalComponent } from '../modals/add-religion-type-modal/add-religion-type-modal.component';
import { AddReviewModalComponent } from '../modals/add-review-modal/add-review-modal.component';
import { ReligiousCenterModel } from '../models/religious-center-model';
import { ReviewModel } from '../models/review-model';
import { HttpClientService } from '../services/http-client.service';
import { MarkersService } from '../services/markers.service';

@Component({
  selector: 'app-additional-container',
  templateUrl: './additional-container.component.html',
  styleUrls: ['./additional-container.component.scss']
})
export class AdditionalContainerComponent implements OnInit {
  constructor(private markersService: MarkersService,
     private cdr: ChangeDetectorRef, 
    private dialog: MatDialog,
    private httpClientService: HttpClientService){}
  public chosenReligionCentre: ReligiousCenterModel | null = null;
  public loggedUserId: string  | null = null;
  public isLoggedUser: boolean = false;
  public isLoggedUserOwner: boolean = false;
  public reviews: ReviewModel[]=[];
  ngOnInit(): void {
    this.markersService.religiousCenterClicked.subscribe(center => {
      console.log('Received new religious center:', center);
      this.chosenReligionCentre=center;
      if(center?.id != undefined)
      {
        this.httpClientService.getAllReviewsOfCentre(center?.id).subscribe(response => {
          console.log('Religion types pulled successfully:', response);
          this.reviews = response;
          this.cdr.detectChanges();
        }, error => {
          console.error('Error getting religion types:', error);
        });
      }
      
      const userId = localStorage.getItem("user_id") ?? '';
      this.loggedUserId= userId;
      this.isLoggedUser=false;
      if(userId)
      {
        this.isLoggedUser=true;
        this.isLoggedUserOwner=(this.loggedUserId !== null && this.chosenReligionCentre !== null &&
        this.loggedUserId === this.chosenReligionCentre.user_id.toString());
        console.log(this.isLoggedUserOwner)
      }
      this.cdr.detectChanges(); // ngif was not detecting changes so this manually trigger change detection
    });
  }
  
  onAddReligiousCenter(newReligiousCenter: ReligiousCenterModel | null) {
    console.log('Received new religious center:', newReligiousCenter);
  }

  onAddReview(eventType: string, $event: any): void {
      this.dispCreateReviewModal(eventType,$event);
  }

  dispCreateReviewModal(eventType: string, $event: any)
  {
    console.log("click! type modal")
    const dialogRef = this.dialog.open(AddReviewModalComponent,
      {
        data: {
          review_text: '',
          mark: 5, 
          religious_center_id: this.chosenReligionCentre?.id,
          user_id: Number(localStorage.getItem("user_id"))
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log("review post:"+result)
      if(result != null)
      {
        this.httpClientService.postReview(result).subscribe(response => {
          this.reviews.push(response) }, error => {
            console.error('Error creating type:', error);
          });
      };
    });   
  }

}
