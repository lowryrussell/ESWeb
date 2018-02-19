import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { SharedModule } from '../shared';

const mapRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'map',
    component: MapComponent
    /*
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
    */
  }
]);

@NgModule({
  imports: [
    mapRouting,
    SharedModule
  ],
  declarations: [
    MapComponent
  ],
  providers: [
  ]
})
export class MapModule {}
