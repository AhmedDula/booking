
import { Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Footer } from '../../layout/footer/footer';
import { Hero } from '../../features/hero/hero';
import { FeaturedProperties } from '../../features/featured-properties/featured-properties';
import { WhyAurelio } from '../../features/why-aurelio/why-aurelio';
import { Testimonials } from '../../features/testimonials/testimonials';
import { Cta } from '../../features/cta/cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    FeaturedProperties,
    WhyAurelio,
    Testimonials,
    Cta,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}




