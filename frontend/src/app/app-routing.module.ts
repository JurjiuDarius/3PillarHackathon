import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UploadComponent } from "./upload/upload.component";
import { AuthenticationGuard } from "./auth/guard/authentication.guard";

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '',
    component: UploadComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard] },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
