import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from './property.service';
import { Property } from './property.model';
import { Room } from '../rooms/room.model';
import { RoomCardComponent } from '../rooms/components/room-card/room-card.component';


@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule,RoomCardComponent],
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.scss'
})
export class ListingDetailComponent {

  // move() {
  //   this.router.navigateByUrl(`/properties`);
  // }
  route = inject(ActivatedRoute)
  router = inject(Router)
  loading = signal<boolean>(true)
  property = signal<Property | null>(null);
  rooms = signal<Room[]>([]);
  propertyId = this.route.snapshot.paramMap.get('id') || null;


  private propertyService = inject(PropertyService)

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      if (this.propertyId) {
        this.fetchProperty();
      }
      else {
        console.error('error fetching property');
        this.router.navigate(['/properties']);
      }
    });  
  }
  
  async fetchProperty() {
    this.loading.set(true);
    try {
      const propertyId = this.propertyId;
      if (propertyId) {
        const property = await this.propertyService.getPropertyById(propertyId);
        this.property.set(property);
        const rooms = await this.propertyService.getRoomsByPropertyId(propertyId);
        this.rooms.set(rooms); 
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      this.loading.set(false);
    }
  }
 

}
