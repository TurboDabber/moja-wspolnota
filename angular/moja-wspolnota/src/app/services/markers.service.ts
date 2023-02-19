import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { ReligiousCenterInfoModalComponent } from '../modals/religious-center-info-modal/religious-center-info-modal.component';
import { AddReligiousCenterModel } from '../models/add-religious-center-model';
import { ReligiousCenterModel } from '../models/religious-center-model';
import { ReligiousCenterInfoService } from './religious-center-info.service';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  private _religiousCenterClicked = new Subject<ReligiousCenterModel | null>();

  get religiousCenterClicked(): Observable<ReligiousCenterModel | null> {
    return this._religiousCenterClicked.asObservable();
  }
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
      const popup = Leaflet.popup({closeOnClick: true, autoClose: true, closeButton: true}).setContent(this.bindData(center))
      marker.bindPopup(popup)
      marker.on('click',(event) => {
        this._religiousCenterClicked.next(center);  
      });
      marker.on('popupclose', (event)=> { //... cały wieczór popsuty bo popup.on('close' ()=>{}) nie działał... ani popup.on('popupclose',[...])
        console.log("finally")
        this._religiousCenterClicked.next(null); 
      })
      if (localStorage.getItem('user_id') === center.user_id.toString()) {
        marker.setIcon(Leaflet.icon({
          iconUrl: 'assets/users-icon.png',
          iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					shadowUrl: 'assets/leaflet/marker-shadow.png'
        }));
      }
      markers.push(marker);
    });
    return markers;
  }
  
  bindData(center: ReligiousCenterModel): string {
    let html = `<div><b>Nazwa wspólnoty:</b> <h1> ${ center.name } </h1></div>` + 
    `<div><b>Opis:</b> <br/><i> ${ center.desc }</i></div>` +
    `<br/><div><b>Typ religii:</b> <br/><i>${ center.religion_type }</i></div>` +
    `<br/><div><b>Założyciel:</b> <br/><i>${ center.user_name }</i></div>` +
    `<br/><div><b>Szerokość geograficzna:</b><i>${ center.lat }</i></div>` +
    `<br/><div><b>Długość geograficzna:</b><i>${ center.lng }</i></div>`
    if (center.image) {
            html +=  `<br/><div><b>Zdjęcie:</b></div>`
            +`<img src="${ center.image }" alt="Zdjęcie ośrodka religijnego"/>`;
     }
     return html;
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
