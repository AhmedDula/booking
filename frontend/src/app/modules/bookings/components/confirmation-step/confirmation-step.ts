import { Component, Input } from '@angular/core';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-confirmation-step',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-step.html',
  styleUrl: './confirmation-step.css',
})
export class ConfirmationStep {

  @Input() booking!: Booking;

}
