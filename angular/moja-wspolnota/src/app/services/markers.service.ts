import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import { ReligiousCenterInfoModalComponent } from '../modals/religious-center-info-modal/religious-center-info-modal.component';
import { ReligiousCenterModel } from '../models/religious-center-model';
import { ReligiousCenterInfoService } from './religious-center-info.service';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor(
    private dialog: MatDialog
  ) { }

  addMarker(latLng: Leaflet.LatLng): Leaflet.Marker {
    const marker = Leaflet.marker(
      latLng,
      {
				icon: Leaflet.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: 'assets/leaflet/marker-icon.png',
					iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
					shadowUrl: 'assets/leaflet/marker-shadow.png'
				})
			}
    );

    return marker;
  }

  loadMarkers(centersList: ReligiousCenterModel[], markers: Leaflet.Layer[]): Leaflet.Layer[] {
    centersList.forEach(center => {
      const latLng: Leaflet.LatLng = Leaflet.latLng(center.lat, center.lng);
      const marker: Leaflet.Marker = this.addMarker(latLng);
      marker.bindPopup(this.bindData(center));
      markers.push(marker);
    });
    return markers;
  }
  
  bindData(center: ReligiousCenterModel): string {
    return `<div>Nazwa wspólnoty: ${ center.name }</div>` + 
           `<div>Opis: ${ center.desc }</div>` +
           `<div>Typ religii: ${ center.religion_type }</div>` +
           `<div>Założyciel: ${ center.user_name }</div>` +
           `<div>Szerokość geograficzna: ${ center.lat }</div>` +
           `<div>Długość geograficzna: ${ center.lng }</div>`;
  }

  private openInfoDialog(center: ReligiousCenterModel): void {
    const dialogRef = this.dialog.open(ReligiousCenterInfoModalComponent,
      {
        data: {
          name: center.name,
          desc: center.desc,
          type_name: center.religion_type,
          user_name: center.user_name,
          lat: center.lat,
          lng: center.lng,
          image: center.image
        }
      });
  }
}
