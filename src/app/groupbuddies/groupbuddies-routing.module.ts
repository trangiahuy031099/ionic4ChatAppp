import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupbuddiesPage } from './groupbuddies.page';

const routes: Routes = [
  {
    path: '',
    component: GroupbuddiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupbuddiesPageRoutingModule {}
