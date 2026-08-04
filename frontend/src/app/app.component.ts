import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingFormComponent } from './modules/bookings/booking-form/booking-form.component';
@Component({
  selector: 'app-root',

  imports: [RouterOutlet , BookingFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('luxury-booking-frontend');

}
