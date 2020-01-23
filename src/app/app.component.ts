import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Icon, icon, marker, Marker } from 'leaflet';
import { BicycleStationService } from './_core/services/bicycleStation.service';
import * as L from 'Leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  showStations: boolean = false;
  stations = null;
  map:L.Map;
  currentMarker: Marker = null;
  activeStation = null;
  mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 7,
    center: latLng(51.9189046, 19.1343786)
  };
  markerHtmlStyles = `
  background-color: white;
  background-image: url('assets/icons/bicycle.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 2rem;
  height: 2rem;
  display: block;
  border-radius: 50%;`

  defaultIcon: L.DivIcon= L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  popupAnchor: [0, -36],
  html: `<span style="${this.markerHtmlStyles}" />`
})
  constructor(private bicycleStationService: BicycleStationService) {}
  ngOnInit() {
    
  }

  onMapReady(map) {
    this.bicycleStationService.getBicycleStations().subscribe(res => {
      console.log(res);
      this.map = map;
      this.stations = res.features;
    })
  }

  onToggleStationsContainer() {
    this.showStations = !this.showStations
  }

  showStationOnMap(station) {
    if(window.innerWidth < 768) {
      this.onToggleStationsContainer();
    }
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker)
    }
    this.activeStation = station;
    const lat = station.geometry.coordinates[0];
    const lng = station.geometry.coordinates[1];
    const zoom = 15;
    this.currentMarker = L.marker([lng, lat], {icon: this.defaultIcon}).addTo(this.map);
    this.map.flyTo([lng, lat], zoom);
  }
  }