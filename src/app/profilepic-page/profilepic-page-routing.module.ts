import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilepicPagePage } from './profilepic-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilepicPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilepicPagePageRoutingModule {}
