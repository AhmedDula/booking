import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../modules/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  authService = inject(AuthService);

router = inject(Router);
  isLoggedIn(): boolean {
    return !!this.authService.currentUser();
  }

  isScrolled = false;
 logout(){
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
        console.log('Logged out successfully')
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}