

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; // صفحة الهوم المعرفة عندك
import { RegisterComponent } from '../app/modules/auth/register.component';
import { LoginComponent } from '../app/modules/auth/login.component';




import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [


    { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {

    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register.component').then((m) => m.RegisterComponent),
  },
  // {
  //   path: 'properties',
  //   loadComponent: () =>
  //     import('./modules/properties/listings.component').then((m) => m.ListingsComponent),
  // },
   {
    path: 'properties',
    loadComponent: () =>
      import('../app/shared/components/property-card/property-card').then((m) => m.PropertyCard),
  },
  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./modules/properties/listing-detail.component').then((m) => m.ListingDetailComponent),
  },

  // Add this route
  {
    path: 'reviews',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/reviews/review-form.component').then(
        (m) => m.ReviewFormComponent
      )
  },

  {
    path: 'bookings/new/:roomId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/bookings/booking-form.component').then((m) => m.BookingFormComponent),
  },
  {
    path: 'bookings/confirmation',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/bookings/booking-confirmation.component').then(
        (m) => m.BookingConfirmationComponent,
      ),
  },
  {
    path: 'my-bookings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/bookings/my-bookings.component').then((m) => m.MyBookingsComponent),
  },
   {
    path: 'admin/rooms/new/:property',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./modules/rooms/components/room-form/room-form.component').then(
        (m) => m.RoomFormComponent
      )
  },
  {
    path: 'disputes/raise/:bookingId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/disputes/raise-dispute/raise-dispute.component').then(
        (m) => m.RaiseDisputeComponent
      )
  },
  {
    path: 'my-disputes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/disputes/my-disputes/my-disputes.component').then(
        (m) => m.MyDisputesComponent
      )
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/users/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/user-dashboard.component').then((m) => m.UserDashboardComponent),
  },
  // {
    // path: 'admin',
    // canActivate: [authGuard, adminGuard],
    //   children: [
      // {
  //       path: '',
  //       loadComponent: () =>
  //         import('./modules/admin/admin-dashboard.component').then(
  //           (m) => m.AdminDashboardComponent
  //         )
  //     },
  //     {
  //       path: 'properties',
  //       loadComponent: () =>
  //         import('./modules/admin/admin-properties.component').then(
  //           (m) => m.AdminPropertiesComponent
  //         )
  //     },
  //     {
  //       path: 'bookings',
  //       loadComponent: () =>
  //         import('./modules/admin/admin-bookings.component').then(
  //           (m) => m.AdminBookingsComponent
  //         )
  //     },
      // {
      //   path: 'disputes',
      //   loadComponent: () =>
      //     import('./modules/admin/admin.disputes').then(
      //       (m) => m.AdminDisputesComponent
      //     )
      // },
  //     {
  //       path: 'users',
  //       loadComponent: () =>
  //         import('./modules/admin/admin-users.component').then(
  //           (m) => m.AdminUsersComponent
  //         )
  //     },
      
  //   ]
  // },
  {
          path: 'admin',
          canActivate: [adminGuard],
          loadChildren: () => import('./modules/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
       {
        path: 'disputes',
        loadComponent: () =>
          import('./modules/admin/admin.disputes').then(
            (m) => m.AdminDisputesComponent
          )
      },
  {
    path: '**',
    redirectTo: '',
  },
]
