import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/service/guard/auth.guard";
import {LoginSignupGuard} from "./core/service/guard/login-signup.guard";

const routes: Routes = [
  {path:'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),canActivate:[LoginSignupGuard]},
  {path:'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),canActivate:[AuthGuard]},
  {path:'prenotation-detail/:id', loadChildren: () => import('./features/prenotation-detail/prenotation-detail.module').then(m => m.PrenotationDetailModule)},
  {path:'settings', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)},
  {path:'bookingroom', loadChildren: () => import('./features/booking-room/booking-room.module').then(m => m.BookingRoomModule)},
  {path:'bookingadmin', loadChildren: () => import('./features/home-admin/home-admin.module').then(m => m.HomeAdminModule)},
  {path:"**", redirectTo:"home",pathMatch:"full"},
  {path:"", redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
