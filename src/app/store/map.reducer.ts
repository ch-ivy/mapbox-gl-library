import { Action, createReducer, on } from '@ngrx/store';
import * as mapActions from './map.actions';
import { LngLatLike, LngLatBounds } from 'mapbox-gl';
import { MarkerModel } from '../services/models';

export interface MapState {
  center: LngLatLike;
  zoom: number;
  markers: MarkerModel[];
  selected_marker?: MarkerModel | null;
}

export const initialState: MapState = {
  center: {
    lat: 45.464211,
    lng: 9.191383,
  },
  zoom: 13,
  markers: [],
};

const _mapReducer = createReducer(
  initialState,
  on(mapActions.loadMapChanged, (state, { center, zoom, markers }) => ({
    center,
    zoom,
    markers,
  })),
  on(mapActions.updateMarkerPoints, (state, action) => {
    const markers = [...state.markers];
    markers.push(action.marker);
    return {
      ...state,
      markers,
    };
  }),
  on(mapActions.LoadMarkers, (state, action) => {
    const markers: MarkerModel[] = JSON.parse(JSON.stringify(state.markers));
    let marker;
    if (action.index) {
      marker = markers[action.index];
      if (action.image) {
        marker.img_link = action.image;
      }
    }
    switch (action.state) {
      case 'zoom': {
        return {
          ...state,
          markers,
          selected_marker: marker,
        };
      }
      case 'replace': {
        return {
          ...state,
          markers,
          selected_marker: marker,
        };
      }

      case 'popup': {
        return {
          ...state,
          markers,
          selected_marker: marker,
        };
      }
      default: {
        const def: MarkerModel[] = [...markers].map((x) => ({
          img_link: '/assets/pin-red.svg',
          center: x.center,
        }));
        return { ...state, markers: [...def], selected_marker: null };
      }
    }
  })
);

export function mapReducer(state: MapState | undefined, action: Action) {
  return _mapReducer(state, action);
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
