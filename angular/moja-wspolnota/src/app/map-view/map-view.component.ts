import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { AdditionalContainerComponent } from '../additional-container/additional-container.component';
import { AddReligiousCenterModalComponent } from '../modals/add-religious-center-modal/add-religious-center-modal.component';
import { AddReligiousCenterModel } from '../models/add-religious-center-model';
import { ReligiousCenterModel } from '../models/religious-center-model';
import { HttpClientService } from '../services/http-client.service';
import { MarkersService } from '../services/markers.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  constructor(
    private markersService: MarkersService,
    private dialog: MatDialog,
    private httpClientService: HttpClientService
  ) {}
  
  ngOnInit(): void {
   //this.markersService
  }
  private _religiousCenterClicked = new Subject<ReligiousCenterModel | null>();

  get religiousCenterClicked(): Observable<ReligiousCenterModel | null> {
    return this._religiousCenterClicked.asObservable();
  }
  private currentLatLng: Leaflet.LatLng | undefined;
  public markers: Leaflet.Layer[] = [];
  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 12,
    center: new Leaflet.LatLng(50.28858, 18.67737)
  };

  onMapClick(eventType: string, $event: any): void {
    console.log($event.latlng.toString());
    this.currentLatLng = $event.latlng;
    if(this.currentLatLng != null && localStorage.getItem("user_id") != null) {
      this.openDialogAddCenter();
    }
  }

  private openDialogAddCenter(): void {
    const dialogRef = this.dialog.open(AddReligiousCenterModalComponent,
      {
        data: {
          name: '',
          lat: this.currentLatLng?.lat,
          lng: this.currentLatLng?.lng,
          user_id: localStorage.getItem('user_id'),
          desc: '',
          image: '',
          religion_type_id: 1
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(this.currentLatLng != null && result != null) {
        //const marker = this.markersService.addMarker(this.currentLatLng);
        
        this.httpClientService.postCenter(result).subscribe(response => {
          this.markers.push(this.markersService.addCenterMarker(response))
          console.log('center created successfully:', response);
        //   const pop = Leaflet.popup({closeOnClick: true, autoClose: true, closeButton: true}).setContent(this.markersService.bindData(response))
        //   marker.bindPopup(pop);
        //   marker.on('click',(event) => {
        //     this._religiousCenterClicked.next(response);  
        //   });
        //   marker.on('popupclose', (event)=> {
        //     console.log("finally")
        //     this._religiousCenterClicked.next(null); 
        //   })
        //   if (localStorage.getItem('user_id') === response.user_id.toString()) {
        //     marker.setIcon(Leaflet.icon({
        //       iconUrl: 'assets/users-icon.png',
        //       iconSize: [ 25, 41 ],
        //       iconAnchor: [ 13, 41 ],
        //       shadowUrl: 'assets/leaflet/marker-shadow.png'
        //     }));
        //   }
        //   this.markers.push(marker);
        //   
        }, error => {
          console.error('Error creating center:', error);
        });
      }
    });
  }

  async loadMarkers(): Promise<void> {
    await this.httpClientService.getAllCenters().subscribe(response => {
      this.markers = this.markersService.loadMarkers(response, this.markers);
      console.log('centers pulled successfully:', response);
    }, error => {
      console.error('Error pulling centers:', error);
    });
  }
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};
