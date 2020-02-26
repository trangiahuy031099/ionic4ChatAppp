import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuddiesPageRoutingModule } from './buddies-routing.module';

import { BuddiesPage } from './buddies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuddiesPageRoutingModule
  ],
  declarations: [BuddiesPage]
})
export class BuddiesPageModule {}
