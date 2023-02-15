import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor() { }

  addMarker(map: Leaflet.Map | undefined, latlng: Leaflet.LatLng): void {
    if(map != null) {
      const marker = Leaflet.marker(latlng);

      marker.addTo(map);
    }
  }
}
