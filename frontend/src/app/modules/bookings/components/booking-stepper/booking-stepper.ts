import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-stepper.html',
  styleUrl: './booking-stepper.css',
})
export class BookingStepperComponent {
  @Input() currentStep = 1;

  steps = [
    { number: 1, title: 'Room' },
    { number: 2, title: 'Dates & Guests' },
    { number: 3, title: 'Your Details' },
    { number: 4, title: 'Confirm' },
  ];
}
