import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupbuddiesPageRoutingModule } from './groupbuddies-routing.module';

import { GroupbuddiesPage } from './groupbuddies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupbuddiesPageRoutingModule
  ],
  declarations: [GroupbuddiesPage]
})
export class GroupbuddiesPageModule {}
