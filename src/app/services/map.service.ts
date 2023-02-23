import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, lastValueFrom, Observable, firstValueFrom, take } from 'rxjs';
import { DBModel, MarkerActions, MarkerModel } from './models';
import { LngLatBounds, LngLatLike, Map } from 'mapbox-gl';
import {
  loadMapChanged,
  updateMarkerPoints,
  LoadMarkers,
} from '../store/map.actions';
import { MapState } from '../store/map.reducer';
import { Store } from '@ngrx/store';
import { getCurrentMarkers, getSelectedMarker } from '../store/map.selector';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map!: Map;
  mapState$!: Observable<MapState>;
  center$!: Observable<LngLatLike>;
  zoom$!: Observable<number>;
  bbox$!: Observable<LngLatBounds>;

  constructor(private http: HttpClient, private store: Store<any>) {}

  getData() {
    return lastValueFrom(
      this.http.get('/assets/data.json').pipe(map((data) => data as DBModel))
    );
  }

  setMapRef(map: Map) {
    this.map = map;
  }

  loadMarkers(state: MarkerActions, image?: string, index?: number) {
    this.store.dispatch(LoadMarkers({ state, image, index }));
  }

  getStoreMarkers() {
    return this.store.select(getCurrentMarkers);
  }

  getSelectedMarker() {
    let marker!: MarkerModel;

    this.store
      .select(getSelectedMarker)
      .pipe(take(1))
      .subscribe((s) => (marker = s as MarkerModel));

    return marker;
  }

  updateMarkers(marker: MarkerModel) {
    this.store.dispatch(updateMarkerPoints({ marker }));
  }

  mapChanged(center: LngLatLike, zoom: number, markers: MarkerModel[]) {
    this.store.dispatch(
      loadMapChanged({
        center,
        zoom,
        markers,
      })
    );
  }
}
