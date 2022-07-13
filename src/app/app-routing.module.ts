import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  {path:'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path:"**", redirectTo:"auth/login",pathMatch:"full"},
  {path:"", redirectTo:"auth/login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
