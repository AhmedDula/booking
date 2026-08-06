import { Component, inject, input} from '@angular/core';
import { Room } from '../../room.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
   room = input.required<Room>();
   router = inject(Router);

 move() {
    const room = this.room();
    if (!room?._id) return;

    this.router.navigateByUrl(`/bookings/new/${room._id}`);
  }
}
