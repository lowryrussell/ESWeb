import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataComponent } from './data.component';
import { SharedModule } from '../shared';

const dataRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'data',
    component: DataComponent
  }
]);

@NgModule({
  imports: [
    dataRouting,
    SharedModule
  ],
  declarations: [
    DataComponent
  ],
  providers: [
  ]
})
export class DataModule {}
