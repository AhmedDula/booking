import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { AdminService } from './admin.service';
import { Property } from '../properties/property.model';

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.properties.html',
})
export class AdminPropertiesComponent implements OnInit {
  private adminService = inject(AdminService);

  readonly adminName = signal('Marcus Chen');

  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  );
  today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );

  search = signal('');

  properties = signal<Property[]>([]);

  filtered = computed(() => {
    const keyword = this.search().toLowerCase().trim();

    if (!keyword) {
      return this.properties();
    }

    return this.properties().filter(
      (property) =>
        property.title.toLowerCase().includes(keyword) ||
        property.location.city.toLowerCase().includes(keyword) ||
        property.propertyType.toLowerCase().includes(keyword),
    );
  });

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.adminService.getProperties().subscribe({
      next: (res: any) => {
        this.properties.set(res.data);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
