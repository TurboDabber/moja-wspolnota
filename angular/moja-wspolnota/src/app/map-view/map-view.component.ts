import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import { AddReligiousCenterModalComponent } from '../modals/add-religious-center-modal/add-religious-center-modal.component';
import { AddReligiousCenterModel } from '../models/add-religious-center-model';
import { HttpClientService } from '../services/http-client.service';
import { MarkersService } from '../services/markers.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent {
  constructor(
    private markersService: MarkersService,
    private dialog: MatDialog,
    private httpClientService: HttpClientService
  ) {}

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
        const marker = this.markersService.addMarker(this.currentLatLng);
        
        this.httpClientService.postCenter(result).subscribe(response => {
          marker.bindPopup(this.markersService.bindData(response));
          this.markers.push(marker);
          console.log('center created successfully:', response);
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
