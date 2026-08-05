import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import{PropertyService}from '../../../modules/properties/property.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
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
  constructor(private service:PropertyService)
  {

  }



ngOnInit(): void {
  this.service.getAllProperties().subscribe({
    next: (res) => {
      this.properties =res.data;
      console.log( res.data);

    },
    error: (err) => {
      console.log(err);
    }
  });
}

  }

//   import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { PropertyService } from '../../../modules/properties/property.service';

// @Component({
//   selector: 'app-property-card',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './property-card.html'
// })
// export class PropertyCard implements OnInit {
//   properties: any[] = [];

//   constructor(private service: PropertyService) {}

//   ngOnInit(): void {
//     this.service.getAllProperties().subscribe({
//       next: (res: any) => {
//         // قائمة مسارات الصور المحلية الخاصة بكي
//         const localImages = [
//           './assets/villa1.jpg',
//           './assets/villa2.jpg',
//           'assets/villa3.jpg',
//           'assets/villa4.jpg'
//         ];

//         // دمج الصور المحلية مع كل عقار راجع من الـ Backend
//         this.properties = res.data.map((property: any, index: number) => ({
//           ...property,
//           // لو الـ backend مبعتش صورة، هيستخدم الصورة المحلية بالترتيب
//           displayImage: property.images && property.images.length > 0
//             ? property.images[0]
//             : localImages[index % localImages.length]
//         }));
//       },
//       error: (err: any) => console.error('Error loading properties:', err)
//     });
//   }
// }
