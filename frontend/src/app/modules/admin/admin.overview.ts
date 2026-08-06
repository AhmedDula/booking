import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service';

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

interface Activity {
  id: string;
  type: 'booking' | 'dispute';
  title: string;
  subtitle: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  templateUrl: './admin.overview.html',
})
export class AdminOverviewComponent implements OnInit {
  private adminService = inject(AdminService);
  private authService = inject(AuthService);
  readonly adminName = computed(() => {
    const user = this.authService.currentUser() as any;
    return user?.data?.user?.name ?? '';
  });

  readonly adminRole = computed(() => {
    const user = this.authService.currentUser() as any;
    return user?.data?.user?.role ?? '';
  });
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  );

  readonly today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  );

  readonly stats = signal<StatCard[]>([]);

  readonly activities = signal<Activity[]>([]);

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

  ngOnInit(): void {
    this.loadStats();
    this.loadActivity();
  }

  loadStats(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (res: any) => {
        const data = res.data;
        console.log(data);
        this.stats.set([
          {
            label: 'Properties',
            value: data.totalProperties.toString(),
            trend: '',
            icon: 'building',
            tone: 'cream',
          },
          {
            label: 'Users',
            value: data.totalUsers.toString(),
            trend: '',
            icon: 'users',
            tone: 'stone',
          },
          {
            label: 'Bookings',
            value: data.totalBookings.toString(),
            trend: '',
            icon: 'book',
            tone: 'cream',
          },
          {
            label: 'Pending',
            value: data.pendingBookings.toString(),
            trend: '',
            icon: 'chart',
            tone: 'stone',
          },
          {
            label: 'Confirmed',
            value: data.confirmedBookings.toString(),
            trend: '',
            icon: 'star',
            tone: 'stone',
          },
          {
            label: 'Revenue',
            value: `$${data.totalRevenue}`,
            trend: '',
            icon: 'trend',
            tone: 'cream',
          },
          {
            label: 'Disputes',
            value: data.openDisputes.toString(),
            trend: '',
            icon: 'alert',
            tone: 'red',
          },
        ]);
      },
      error: (err) => console.error(err),
    });
  }

  loadActivity(): void {
    this.adminService.getRecentActivity().subscribe({
      next: (res: any) => {
        const bookings = res.data.recentBookings.map((b: any) => ({
          id: b._id,
          type: 'booking' as const,
          title: b.room?.name ?? 'Room',
          subtitle: b.user?.name ?? 'Unknown User',
          date: new Date(b.createdAt).toLocaleDateString(),
          status: b.status,
        }));

        const disputes = res.data.recentDisputes.map((d: any) => ({
          id: d._id,
          type: 'dispute' as const,
          title: d.reason,
          subtitle: d.user?.name ?? 'Unknown User',
          date: new Date(d.createdAt).toLocaleDateString(),
          status: d.status,
        }));

        this.activities.set(
          [...bookings, ...disputes].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        );
      },
      error: (err) => console.error(err),
    });
  }

  donutOffset(index: number): number {
    return this.propertyTypes.slice(0, index).reduce((sum, slice) => sum + slice.percent, 0);
  }
}
