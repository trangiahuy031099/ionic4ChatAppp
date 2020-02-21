import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilepicPagePageRoutingModule } from './profilepic-page-routing.module';

import { ProfilepicPagePage } from './profilepic-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilepicPagePageRoutingModule
  ],
  declarations: [ProfilepicPagePage]
})
export class ProfilepicPagePageModule {}
