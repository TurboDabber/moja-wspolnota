import { AfterViewInit, Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MarkersService } from '../services/markers.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit{
  constructor(private markersService: MarkersService) {}

  private map: Leaflet.Map | undefined;

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 12,
    center: new Leaflet.LatLng(50.28858, 18.67737)
  };

  onMapClick(eventType: string, $event: any): void {
    console.log($event.latlng.toString());
    this.markersService.addMarker(this.map, $event.latlng);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = Leaflet.map('map', {
      zoom: 12,
      center: new Leaflet.LatLng(50.28858, 18.67737)
    })
  }
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};
