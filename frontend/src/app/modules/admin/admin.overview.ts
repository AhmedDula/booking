import { Component, signal } from '@angular/core';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  icon: 'building' | 'bed' | 'users' | 'book' | 'trend' | 'chart' | 'star' | 'alert';
  tone: 'cream' | 'stone' | 'red';
}

interface PropertyTypeSlice {
  label: string;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  templateUrl: './admin.overview.html',
})
export class AdminOverviewComponent {
  readonly adminName = signal('Marcus Chen');
  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  );
  readonly today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  readonly stats: StatCard[] = [
    { label: 'Properties', value: '8', trend: '↑ 2 this month', icon: 'building', tone: 'cream' },
    { label: 'Rooms', value: '18', trend: '↑ 4 new rooms', icon: 'bed', tone: 'stone' },
    { label: 'Total Guests', value: '247', trend: '↑ 12% growth', icon: 'users', tone: 'stone' },
    { label: 'Bookings', value: '1,284', trend: '↑ 8% growth', icon: 'book', tone: 'cream' },
    { label: 'Revenue YTD', value: '$3.8M', trend: '↑ 22% vs last year', icon: 'trend', tone: 'cream' },
    { label: 'Avg. Nightly Rate', value: '$1420', trend: '↑ $120 increase', icon: 'chart', tone: 'stone' },
    { label: 'Occupancy Rate', value: '78%', trend: '↑ 6% improvement', icon: 'star', tone: 'stone' },
    { label: 'Open Disputes', value: '1', trend: '', icon: 'alert', tone: 'red' },
  ];

  readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  readonly monthlyBookings = [148, 112, 160, 172, 184, 196, 232, 64];
  readonly maxMonthlyBookings = 240;

  readonly propertyTypes: PropertyTypeSlice[] = [
    { label: 'Apartment', percent: 22, color: '#166534' },
    { label: 'House', percent: 18, color: '#1c1917' },
    { label: 'Cabin', percent: 12, color: '#a16207' },
    { label: 'Studio', percent: 6, color: '#4d7c0f' },
    { label: 'Penthouse', percent: 4, color: '#a8a29e' },
  ];

  readonly recentBookings = [
    {
      id: 'book-001',
      guest: 'Eleanor Sinclair',
      property: 'Villa Sereno',
      room: 'The Jungle Master Suite',
      checkIn: 'Sep 14',
      checkOut: 'Sep 21, 2026',
      total: '$12,950',
      status: 'Confirmed',
    },
    {
      id: 'book-002',
      guest: 'Eleanor Sinclair',
      property: 'Azure Heights',
      room: 'Aegean Sea Suite',
      checkIn: 'Oct 1',
      checkOut: 'Oct 6, 2026',
      total: '$15,500',
      status: 'Confirmed',
    },
  ];

  donutOffset(index: number): number {
    return this.propertyTypes
      .slice(0, index)
      .reduce((sum, slice) => sum + slice.percent, 0);
  }
}
