import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeProPage } from './home-pro.page';

const routes: Routes = [
  {
    path: '',
    component: HomeProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProPageRoutingModule {}
