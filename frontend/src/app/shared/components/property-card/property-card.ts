import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import{PropertyService}from '../../../modules/properties/property.service'
@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.html'
})
export class PropertyCard  implements OnInit{
  properties:any[]=[]
  constructor(private service:PropertyService)
  {

  }



ngOnInit(): void {
  this.service.getAllProperties().subscribe({
    next: (res) => {
      this.properties =res.data;
      console.log( this.properties);
      this.properties = res.data;

const images = [
  'assets/villa1.jpg',
  'assets/villa2.jpg',
  'assets/villa3.jpg',

  'assets/villa4.jpg'
];

this.properties = this.properties.map((property, index) => ({
  ...property,
  image: images[index]
}));

    },
    error: (err) => {
      console.log(err);
    }
  });
}

  }

