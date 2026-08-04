import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-details-step',
  imports: [FormsModule],
  templateUrl: './details-step.html',
  styleUrl: './details-step.css',
})
export class DetailsStep {

  @Input() booking!: Booking;

      errors = {
        name: '',
        email: '',
        phone: ''
      };

      submitted = false;

  validateName(){

  if(!this.booking.guestName.trim()){
    this.errors.name = "Name is required";
  }
  else{
    this.errors.name = "";
  }

  }
    validateEmail(){

      if(!this.booking.guestEmail.trim()){
        this.errors.email = "Email is required";
        return;
      }


      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if(!emailPattern.test(this.booking.guestEmail)){
        this.errors.email = "Invalid email";
      }
      else{
        this.errors.email = "";
      }

    }
    validatePhone(){

      if(!this.booking.guestPhone.trim()){
        this.errors.phone = "Phone is required";
      }
      else if(this.booking.guestPhone.length  < 10){
        this.errors.phone = "Invalid phone number";
      }
      else{
        this.errors.phone = "";
      }

    }

    validateAll(): boolean {

      this.submitted = true;

  this.validateName();
  this.validateEmail();
  this.validatePhone();

  return (
    !this.errors.name &&
    !this.errors.email &&
    !this.errors.phone
  );

}
}
