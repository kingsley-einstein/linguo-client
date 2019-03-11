import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main/main.page';
import { ChatPage } from './chat/chat.page';
import { SettingsPage } from './settings/settings.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'main/:username', component: MainPage, children: [
    { path: 'chat', component: ChatPage },
  { path: 'settings', component: SettingsPage },
  { path: '', redirectTo: 'chat', pathMatch: 'full'}
  ] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
