import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UploadComponent } from "./upload/upload.component";

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup',
    component: SignUpComponent },
  {
    path: 'upload',
    component: UploadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
