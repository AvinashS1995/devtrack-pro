import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'work-tracker',
        loadComponent: () =>
          import('../app/pages/work-tracker/work-tracker.component').then(
            (c) => c.WorkTrackerComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../app/pages/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
      },
    ],
  },
];
