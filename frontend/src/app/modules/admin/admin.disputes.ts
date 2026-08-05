import { Component, computed, signal } from '@angular/core';

type DisputeFilter = 'Open' | 'Under Review' | 'Resolved';

interface Dispute {
  id: string;
  property: string;
  guest: string;
  bookingId: string;
  filedDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: DisputeFilter;
  description: string;
}

@Component({
  selector: 'app-admin-disputes',
  standalone: true,
  templateUrl: './admin.disputes.html',
})
export class AdminDisputesComponent {
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

  readonly activeFilter = signal<DisputeFilter | 'All'>('All');

  readonly disputes = signal<Dispute[]>([
    {
      id: 'disp-1',
      property: 'Cedar Peak Lodge',
      guest: 'Eleanor Sinclair',
      bookingId: 'book-003',
      filedDate: '2/22/2026',
      priority: 'Medium',
      status: 'Resolved',
      description: 'Hot tub was non-operational for 3 of 6 nights. Requested partial refund of $490.',
    },
    {
      id: 'disp-2',
      property: 'Pinnacle Residence',
      guest: 'James Whitmore',
      bookingId: 'book-005',
      filedDate: '4/10/2026',
      priority: 'High',
      status: 'Resolved',
      description: 'Air conditioning malfunction on arrival. Maintenance arrived within 2 hours but disrupted first evening.',
    },
    {
      id: 'disp-3',
      property: 'The Kyoto Sanctuary',
      guest: 'Sofia Rossi',
      bookingId: 'book-007',
      filedDate: '7/20/2026',
      priority: 'Low',
      status: 'Open',
      description: 'Description stated bicycle hire included but was not available. Requesting $120 compensation.',
    },
  ]);

  readonly filtered = computed(() => {
    const f = this.activeFilter();
    if (f === 'All') return this.disputes();
    return this.disputes().filter((d) => d.status === f);
  });

  setFilter(filter: DisputeFilter | 'All'): void {
    this.activeFilter.set(filter);
  }

  resolveDispute(id: string): void {
    this.disputes.update((list) =>
      list.map((d) => (d.id === id ? { ...d, status: 'Resolved' } : d))
    );
  }

  closeDispute(id: string): void {
    this.disputes.update((list) => list.filter((d) => d.id !== id));
  }
}
