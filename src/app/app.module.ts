import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapWrapModule } from 'map-wrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    NgbModule,
    MapWrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
