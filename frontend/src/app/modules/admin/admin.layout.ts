import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string; // path key rendered in the template's icon switch
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin.layout.html',
})
export class AdminLayoutComponent {
  readonly collapsed = signal(false);

  readonly adminName = signal('Marcus Chen');
  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  );

  readonly navItems: NavItem[] = [
    { label: 'Overview', path: '/admin/overview', icon: 'home' },
    { label: 'Properties', path: '/admin/properties', icon: 'building' },
    { label: 'Rooms', path: '/admin/rooms', icon: 'bed' },
    { label: 'Bookings', path: '/admin/bookings', icon: 'book' },
    { label: 'Users', path: '/admin/users', icon: 'users' },
    { label: 'Reviews', path: '/admin/reviews', icon: 'star' },
    { label: 'Disputes', path: '/admin/disputes', icon: 'alert' },
  ];

  toggleCollapsed(): void {
    this.collapsed.update((v) => !v);
  }
}
