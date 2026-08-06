import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../modules/properties/property.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-card.html'
})
export class PropertyCard implements OnInit {
  readonly properties = signal<any[]>([]);

  images: string[] = [
    'assets/villa1.jpg',
    '/assets/villa2.jpg',
    '/assets/villa3.jpg',
    '/assets/villa4.jpg'
  ];

  selectedSort = '';
  loading = true;

  constructor(
    private service: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.service.getProperties().subscribe({
      next: (res) => {
        this.properties.set(res.data);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  sortProperties(): void {
    const sorted = [...this.properties()];

    switch (this.selectedSort) {
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case '-name':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case 'price':
        sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;

      case '-price':
        sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;

      default:
        // 'Sort By' selected — leave order as-is
        break;
    }

    this.properties.set(sorted);
  }

  goToDetails(id: string): void {
    this.router.navigate(['/properties', id]);
  }
}