

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; // صفحة الهوم المعرفة عندك
import { RegisterComponent } from '../app/modules/auth/register.component';
import { LoginComponent } from '../app/modules/auth/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
