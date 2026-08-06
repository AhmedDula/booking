


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html'
})
export class Hero {
  selectedType: string = 'All Types';
  selectedCountry: string = 'All Countries';
  selectedCity: string = 'All Cities';

  types: string[] = ['All Types', 'Villa', 'Cabin', 'House'];
  countries: string[] = ['All Countries', 'Paris', 'Italy', 'Spain', 'Greece'];
  cities: string[] = ['All Cities', 'Cairo', 'Faraya', 'Sheikh', 'Hurghada'];

  onSearch(): void {
    console.log('Searching for:', {
      type: this.selectedType,
      country: this.selectedCountry,
      city: this.selectedCity
    });
  }
}
