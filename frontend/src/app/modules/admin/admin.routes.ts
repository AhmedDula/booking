import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.layout').then((m) => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        loadComponent: () =>
          import('./admin.overview').then((m) => m.AdminOverviewComponent),
      },
      {
        path: 'properties',
        loadComponent: () =>
          import('./admin.properties').then((m) => m.AdminPropertiesComponent),
      },
      {
        path: 'rooms',
        loadComponent: () =>
          import('./admin.rooms').then((m) => m.AdminRoomsComponent),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./admin.bookings').then((m) => m.AdminBookingsComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./admin.users').then((m) => m.AdminUsersComponent),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./admin.reviews').then((m) => m.AdminReviewsComponent),
      },
      {
        path: 'disputes',
        loadComponent: () =>
          import('./admin.disputes').then((m) => m.AdminDisputesComponent),
      },
    ],
  },
];
