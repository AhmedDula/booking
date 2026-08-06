import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{PropertyService}from '../../../modules/properties/property.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './property-card.html'
})
export class PropertyCard  implements OnInit{
  images: string[] = [
    'assets/villa1.jpg',
    '/assets/villa2.jpg',
    '/assets/villa3.jpg',
    '/assets/villa4.jpg'
  ];
  properties:any[]=[]
  selectedSort='';
  constructor(private service:PropertyService,private router: Router)
  {

  }



ngOnInit(): void {
  this.service.getProperties().subscribe({
    next: (res) => {
      this.properties =res.data;
      console.log( res.data);

    },
    error: (err) => {
      console.log(err);
    }
  });
}sortProperties() {
  switch (this.selectedSort) {
    case 'name':
      this.properties.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case '-name':
      this.properties.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case 'price':
      this.properties.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;

    case '-price':
      this.properties.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
  }

  
  this.properties = [...this.properties];
}
goToDetails(id: string) {
  this.router.navigate(['/properties', id]);
}

  }
