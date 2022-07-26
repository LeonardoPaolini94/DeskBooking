import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/service/guard/auth.guard";
import {LoginSignupGuard} from "./core/service/guard/login-signup.guard";
import {HomeModule} from "./features/home/home.module";

const routes: Routes = [
  {path:'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),canActivate:[LoginSignupGuard]},
  {path:'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
  {path:'cardBooking', loadChildren: () => import('./features/card-booking/card-booking.module').then(m => m.CardBookingModule)},
  {path:'booking-detail/:id', loadChildren: () => import('./features/booking-detail/booking-detail.module').then(m => m.BookingDetailModule)},
  {path:'settings', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)},
  {path:'bookingroom', loadChildren: () => import('./features/booking-room/booking-room.module').then(m => m.BookingRoomModule)},
  {path:'bookingadmin', loadChildren: () => import('./features/home-admin/home-admin.module').then(m => m.HomeAdminModule)},
  {path:'bookinguser', loadChildren: () => import('./features/booking-user/booking-user.module').then(m => m.BookingUserModule),canActivate:[AuthGuard]},
  {path:'homeuser', loadChildren: () => import('./features/home-user/home-user.module').then(m => m.HomeUserModule), canActivate:[AuthGuard]},
  {path:"**", redirectTo:"home",pathMatch:"full"},
  {path:"", redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
