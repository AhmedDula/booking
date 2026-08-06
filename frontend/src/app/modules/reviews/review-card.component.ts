import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reviewService } from './review.service';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
})
export class ReviewCardComponent {

  private reviewService = inject(reviewService);

  reviews = signal<any[]>([]);

  async ngOnInit() {
    this.loadReviews();
  }

  private dummyNames = [
  'Emily Carter',
  'James Anderson',
  'Sophia Bennett',
  'Michael Thompson'
];
  async loadReviews() {
    const reviews = await this.reviewService.getAll();

    const allreviews = reviews.map((review, index) => ({
    ...review,
    userName: this.dummyNames[index % this.dummyNames.length]
    }));

    this.reviews.set(allreviews);
  }
}




// import { Component, inject, Input, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { reviewService } from './review.service';
// import { UserService } from '../users/user.service';
// import { firstValueFrom } from 'rxjs';
// @Component({
//   selector: 'app-review-card',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './review-card.component.html',
// })
// export class ReviewCardComponent {

//    private reviewService = inject(reviewService);
//   private userService = inject(UserService);

//   reviews = signal<any[]>([]);

//   async ngOnInit() {
//     this.loadReviews();
//   }

//   async loadReviews() {
//     const reviews = await this.reviewService.getAll();
//         console.log('REVIEWS:', reviews);


//     const userCache = new Map<string, any>();

//     const enriched = await Promise.all(
//       reviews.map(async (r) => {
//         console.log(r.user);

//         let userData = null;

//         if (r.user) {

//           if (!userCache.has(r.user)) {
//             const res = await firstValueFrom(
//               this.userService.getUserById(r.user)
//             );

//             userCache.set(r.user, res.data);
//           }
//           userData = userCache.get(r.user);
//         }

//         return {
//           ...r,
//           userName: userData?.name || 'Guest',
//         };
//       })
//     );

//     this.reviews.set(enriched);
//   }

// }