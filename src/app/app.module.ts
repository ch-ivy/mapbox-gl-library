import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapWrapModule } from 'map-wrap';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { mapReducer } from './store/map.reducer';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      map: mapReducer,
    }),
    NgbModule,
    MapWrapModule.withConfig({
      accessToken: environment.mapbox_token,
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
