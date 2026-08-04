import { Component, Input } from '@angular/core';
import { Booking } from '../../booking.model';


@Component({
  selector: 'app-room-step',
  standalone: true,
  imports: [],
  templateUrl: './room-step.html',
  styleUrl: './room-step.css'
})
export class RoomStep {

  @Input() booking!: Booking;

  validateAll(): boolean {

  return true;

}
}
