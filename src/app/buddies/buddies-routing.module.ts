import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuddiesPage } from './buddies.page';

const routes: Routes = [
  {
    path: '',
    component: BuddiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuddiesPageRoutingModule {}
