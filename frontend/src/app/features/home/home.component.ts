
import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { Hero } from '../../features/hero/hero';
import { FeaturedProperties } from '../../features/featured-properties/featured-properties';
import{ PropertyCard } from'../../shared/components/property-card/property-card';
import { WhyAurelio } from '../../features/why-aurelio/why-aurelio';
import { Testimonials } from '../../features/testimonials/testimonials';
import { Cta } from '../../features/cta/cta';
//import { Hero } from '../../features/home/components/hero/hero.component';
//import { HttpClient } from '@angular/common/http';
//import { environment } from '../../../environments/environment';
//import{UserDashboardComponent}from '../../features/dashboard/user-dashboard.component'
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
    Footer,PropertyCard
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



}

