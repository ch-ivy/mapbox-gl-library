import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MapService } from './services/map.service';
import { BehaviorSubject } from 'rxjs';
import {
  GeocodeModel,
  MarkerActions,
  MarkerModel,
  RecordModel,
} from './services/models';
import { MapMouseEvent, Map, EventData, LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mapbox-gl-library';
  token = environment.mapbox_token;
  message!: string;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';

  center!: any;
  zoom: [number] = [13];
  data: any;
  marker_points: MarkerModel[] = [];
  geocode_data: GeocodeModel[] = [];
  isLoading = new BehaviorSubject<boolean>(true);
  marker_click: boolean = false;
  marker_state!: MarkerActions;
  selected_pic!: number;
  records!: RecordModel[];
  selected_record!: RecordModel | null;

  constructor(private mapService: MapService) {}

  get map() {
    return this.mapService.map;
  }

  ngOnInit() {
    this.mapService
      .getData()
      .then((data) => {
        this.records = data.records;
        this.geocode_data = data.records.map((x) => {
          return x.geocode;
        });
        const lng = this.geocode_data[0].Longitude;
        const lat = this.geocode_data[0].Latitude;

        this.center = [lng, lat]; //new mapboxgl.LngLat(lng, lat);

        this.isLoading.next(false);
        this.isLoading.complete();
      })
      .catch(console.error);
  }

  get markers() {
    return this.mapService.getStoreMarkers();
  }

  get selected_marker(): MarkerModel | null {
    return this.mapService.getSelectedMarker();
  }

  setMap(map: Map) {
    this.marker_points = this.geocode_data.map((x) => ({
      center: [x.Longitude, x.Latitude],
      img_link: '/assets/pin-red.svg',
    }));
    this.mapService.setMapRef(map);
    this.mapService.mapChanged(
      map.getCenter(),
      map.getZoom(),
      this.marker_points
    );
  }

  showAllPins() {
    this.mapService.loadMarkers(null);
    var bounds = new LngLatBounds();
    // console.log(mapboxgl.Marker);
    for (var i = 0; i < this.marker_points.length; i++) {
      const center = this.marker_points[i].center;
      if (center) bounds.extend(center);
    }

    this.map.fitBounds(bounds);
  }

  markerActions(index: number) {
    this.message = '';

    switch (this.marker_state) {
      case 'zoom': {
        this.panTo(index);
        return;
      }
      case 'replace': {
        if (this.selected_pic) {
          this.changePin(index);
        }

        return;
      }

      case 'popup': {
        this.selected_record =
          index < this.records.length ? this.records[index] : this.records[0];
        this.panTo(index);

        return;
      }
    }
  }

  panTo(index: number) {
    this.mapService.loadMarkers(
      this.marker_state,
      '/assets/pin-blue.svg',
      index
    );

    if (this.selected_marker) {
      this.map.easeTo({
        center: this.selected_marker.center,
        zoom: 14,
        duration: 2000,
      });
    }
  }

  toggleMarkerState(state: MarkerActions, message: string) {
    this.marker_state = state;
    this.marker_click = true;
    this.selected_record = null;
    this.message = message;
    this.selected_pic = 0;
    this.showAllPins();
  }

  selectMarkerImage(item: number) {
    this.selected_pic = item;
    this.message = 'Select Markers to Replace';
  }

  changePin(index: number) {
    const img_link = `/assets/pin${this.selected_pic}.svg`;
    this.mapService.loadMarkers(this.marker_state, img_link, index);
  }

  addMarker(event: MapMouseEvent & EventData) {
    if (this.marker_state == 'addMarker') {
      const point = {
        center: event.lngLat,
        img_link: '/assets/pin-red.svg',
      };
      this.mapService.updateMarkers(point);
    }
  }
}
