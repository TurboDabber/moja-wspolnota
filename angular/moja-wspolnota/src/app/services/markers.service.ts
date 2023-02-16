import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ReligiousCenterModel } from '../models/religious-center-model';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor() { }

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
      markers.push(marker);
    });
    return markers;
  } 
}
