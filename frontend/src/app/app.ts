import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingFormComponent } from './modules/bookings/booking-form/booking-form.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,BookingFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
