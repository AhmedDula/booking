import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { CurrencyFormatPipe } from './shared/pipes/currency-format-pipe';
//import { NightsBetweenPipe } from './shared/pipes/nights-between-pipe';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet ],//CurrencyFormatPipe, NightsBetweenPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
