


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

  types: string[] = ['All Types', 'Villa', 'Estate', 'Residence'];
  countries: string[] = ['All Countries', 'France', 'Italy', 'Spain', 'Greece'];
  cities: string[] = ['All Cities', 'Nice', 'Florence', 'Marbella', 'Mykonos'];

  onSearch(): void {
    console.log('Searching for:', {
      type: this.selectedType,
      country: this.selectedCountry,
      city: this.selectedCity
    });
  }
}
