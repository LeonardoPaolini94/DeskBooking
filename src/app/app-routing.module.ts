import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  {path:"**", redirectTo:"home",pathMatch:"full"},
  {path:"", redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
