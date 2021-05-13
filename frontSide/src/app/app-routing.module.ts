
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { MainComponent } from './main/main.component'
import { RedirectComponent } from './redirect/redirect.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'main/:id', component: MainComponent },
  { path: '', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: ':userId', component: RedirectComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// ng serve --host=165.227.138.164
