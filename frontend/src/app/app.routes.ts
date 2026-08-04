import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'properties',
    loadComponent: () =>
      import('./modules/properties/listings.component').then((m) => m.ListingsComponent)
  },
  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./modules/properties/listing-detail.component').then(
        (m) => m.ListingDetailComponent
      )
  },
  {
    path: 'bookings/new/:propertyId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/bookings/booking-form/booking-form.component').then(
        (m) => m.BookingFormComponent
      )
  },
  {
    path: 'bookings/confirmation/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/bookings/booking-confirmation.component/booking-confirmation.component').then(
        (m) => m.BookingConfirmationComponent
      )
  },
  {
    path: 'my-bookings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/bookings/my-bookings.component/my-bookings.component').then(
        (m) => m.MyBookingsComponent
      )
  },
  {
    path: 'disputes/raise/:bookingId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/disputes/raise-dispute.component').then(
        (m) => m.RaiseDisputeComponent
      )
  },
  {
    path: 'my-disputes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/disputes/my-disputes.component').then(
        (m) => m.MyDisputesComponent
      )
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/users/profile.component').then((m) => m.ProfileComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/user-dashboard.component').then(
        (m) => m.UserDashboardComponent
      )
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/admin/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          )
      },
      {
        path: 'properties',
        loadComponent: () =>
          import('./modules/admin/admin-properties.component').then(
            (m) => m.AdminPropertiesComponent
          )
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./modules/admin/admin-bookings.component').then(
            (m) => m.AdminBookingsComponent
          )
      },
      {
        path: 'disputes',
        loadComponent: () =>
          import('./modules/admin/admin-disputes.component').then(
            (m) => m.AdminDisputesComponent
          )
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./modules/admin/admin-users.component').then(
            (m) => m.AdminUsersComponent
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
