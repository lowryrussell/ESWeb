import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared';

import { AgmCoreModule } from '@agm/core';

const mapRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'map',
    component: MapComponent
  }
]);

@NgModule({
  imports: [
    mapRouting,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwykGuMMNTt5gxXZPxxbFjrwtSo8s_R60'
    })
  ],
  declarations: [
    MapComponent
  ],
  providers: [
  ]
})
export class MapModule {}
