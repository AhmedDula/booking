import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminService } from './admin.service';
import { Room } from '../rooms/room.model';

@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.rooms.html',
})
export class AdminRoomsComponent implements OnInit {
  private adminService = inject(AdminService);

  rooms = signal<Room[]>([]);

  search = signal('');

  isAddModalOpen = signal(false);

  newRoom = signal<Room>({
    property: '',
    name: '',
    description: '',
    price: 0,
    maxGuests: 1,
    beds: 1,
    bathrooms: 1,
    roomSize: 1,
  });

  filteredRooms = computed(() => {
    const keyword = this.search().toLowerCase();

    return this.rooms().filter((room) => room.name.toLowerCase().includes(keyword));
  });

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.adminService.getRooms().subscribe({
      next: (res: any) => {
        this.rooms.set(res.data);
      },

      error: (err) => console.log(err),
    });
  }

  openAddModal() {
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);

    this.newRoom.set({
      property: '',
      name: '',
      description: '',
      price: 0,
      maxGuests: 1,
      beds: 1,
      bathrooms: 1,
      roomSize: 1,
    });
  }

  saveRoom() {
    this.adminService.addRoom(this.newRoom()).subscribe({
      next: () => {
        this.loadRooms();

        this.closeAddModal();
      },

      error: (err) => console.log(err),
    });
  }
}
