import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataComponent } from './data.component';
import { SharedModule } from '../shared';
import { ChartsModule } from 'ng2-charts/ng2-charts';


const dataRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'data',
    component: DataComponent
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
    dataRouting,
    SharedModule,
    ChartsModule
  ],
  declarations: [
    DataComponent
  ],
  providers: [
  ]
})
export class DataModule {}
