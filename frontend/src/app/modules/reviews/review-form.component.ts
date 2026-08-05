import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { reviewService } from './review.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent implements OnInit {

  private reviewService = inject(reviewService);
  private route = inject(ActivatedRoute);


  rating = 5;
  comment = '';

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Property ID:', this.propertyId);
  }

  addReview(): void {

  

    if (!this.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    const review = {
      rating: this.rating,
      comment: this.comment,
    
    };

    this.reviewService.create(review)
      .then(() => {
        alert('Review added successfully');
        this.rating = 5;
        this.comment = '';
      })
      .catch((err) => {
        console.error(err);
        alert(
          err?.error?.message ||
          'Failed to add review'
        );
      });
  }
}
