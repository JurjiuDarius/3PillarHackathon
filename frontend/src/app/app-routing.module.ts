import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthenticationGuard } from "./auth/guard/authentication.guard";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard] },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup',
    component: SignUpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
