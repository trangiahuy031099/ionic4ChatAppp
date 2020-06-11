import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profilepic-page',
    loadChildren: () => import('./profilepic-page/profilepic-page.module').then( m => m.ProfilepicPagePageModule)
  },
  {
    path: 'passwordreset',
    loadChildren: () => import('./passwordreset/passwordreset.module').then( m => m.PasswordresetPageModule)
  },
  {
    path: 'buddies',
    loadChildren: () => import('./buddies/buddies.module').then( m => m.BuddiesPageModule)
  },
  {
    path: 'buddychat',
    loadChildren: () => import('./buddychat/buddychat.module').then( m => m.BuddychatPageModule)
  },
  {
    path: 'newgroup',
    loadChildren: () => import('./newgroup/newgroup.module').then( m => m.NewgroupPageModule)
  },
  {
    path: 'groupchat',
    loadChildren: () => import('./groupchat/groupchat.module').then( m => m.GroupchatPageModule)
  },
  {
    path: 'groupbuddies',
    loadChildren: () => import('./groupbuddies/groupbuddies.module').then( m => m.GroupbuddiesPageModule)
  },
  {
    path: 'groupmember',
    loadChildren: () => import('./groupmember/groupmember.module').then( m => m.GroupmemberPageModule)
  },
  {
    path: 'groupinfo',
    loadChildren: () => import('./groupinfo/groupinfo.module').then( m => m.GroupinfoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
