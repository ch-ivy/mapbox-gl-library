import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mapbox-gl-library';
  token = environment.mapbox_token;
  mapOptions = {
    style:
      'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ',
    zoom: 13,
  };
  center = new mapboxgl.LngLat(33.90125, 35.143627);

  constructor() {}

  ngOnInit() {}
}
