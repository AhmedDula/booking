import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { CurrencyFormatPipe } from './shared/pipes/currency-format-pipe';
//import { NightsBetweenPipe } from './shared/pipes/nights-between-pipe';
@Component({
  selector: 'app-root',

  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  protected readonly title = signal('Aurelio');
}
