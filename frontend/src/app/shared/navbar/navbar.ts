import { Component,inject } from '@angular/core';

import {  HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../modules/auth/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
authService=inject(AuthService);
isLoggedIn():boolean{
  return ! this.authService.currentUser();
}
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

}
