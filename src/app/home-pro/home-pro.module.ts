import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeProPageRoutingModule } from './home-pro-routing.module';

import { HomeProPage } from './home-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeProPageRoutingModule
  ],
  declarations: [HomeProPage]
})
export class HomeProPageModule {}
