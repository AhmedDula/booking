import { Component, inject, signal } from '@angular/core';
import { Room } from '../../room.model';
import { form, min, minLength, required, FormField, submit } from '@angular/forms/signals';
import { RoomService } from '../../room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-room-form',
  imports: [FormField, ButtonModule, RippleModule, ToastModule],
  providers: [MessageService],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent {
  roomsService = inject(RoomService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  messageService = inject(MessageService)

  property: string = "";

  roomModel = signal({
    name: "",
    description: "",
    price: 0,
    maxGuests: 1,
    beds: 1,
    bathrooms: 1,
    roomSize: 0,
    images: "",
    amenities: "",
    available: true
  })

  addRoom = form(this.roomModel,(schema) => {
    required(schema.name,{message:"name is required"})
    minLength(schema.name,3,{message:"min char is 3"})

    required(schema.description,{message:"description is required"})
    minLength(schema.description,3,{message:"min char is 3"})

    required(schema.images,{message:"images is required"})
    minLength(schema.images,3,{message:"min char is 3"})

    required(schema.amenities,{message:"amenities is required"})
    minLength(schema.amenities,3,{message:"min char is 3"})

    required(schema.price,{message:"price is required"})
    min(schema.price,1,{message:"price must be positive"})

    required(schema.maxGuests,{message:"maxGuests is required"})
    min(schema.maxGuests,1,{message:"maxGuests must be positive"})

    required(schema.beds,{message:"beds is required"})
    min(schema.beds,1,{message:"beds must be positive"})

    required(schema.bathrooms,{message:"bathrooms is required"})
    min(schema.bathrooms,1,{message:"bathrooms must be positive"})

    required(schema.roomSize,{message:"roomSize is required"})
    min(schema.roomSize,1,{message:"roomSize must be positive"})
  })

ngOnInit() {
  const segments = this.route.snapshot.url;

    if (segments.length >= 4) {
      this.property = segments[3].path; 
    }

    console.log("Property ID:", this.property);
  }

  async onSubmit(e: Event) {
    e.preventDefault();

    await submit(this.addRoom, async (val) => {
      const data = val().value();

      const payload: Omit<Room, "_id"> = {
        ...data,
        property: this.property, 
        images: data.images.split(",").map(i => i.trim()),
        amenities: data.amenities.split(",").map(a => a.trim()),
      };

      try {
        const res = await this.roomsService.createRoom(payload);
        console.log(res);

        this.messageService.add({
          severity: 'success',
          summary: 'Saved successfully',
          detail: 'Room created successfully.'
        });

        this.router.navigate(['/admin/rooms']);

      } catch (error) {
        console.error("Error creating room:", error);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create room.'
        });
      }
    });
  }
}