import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./core/register/register.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.component'),
  },
];
