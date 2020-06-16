import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project-list', component: ProjectListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
