import { Component, signal } from '@angular/core';

interface Review {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  tripType: string;
  date: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  templateUrl: './admin.reviews.html',
})
export class AdminReviewsComponent {
  readonly adminName = signal('Marcus Chen');
  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  );
  readonly today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  readonly search = signal('');

  readonly reviews = signal<Review[]>([
    {
      id: 'rev-1',
      guest: 'Isabelle Marchetti',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=100&q=80',
      property: 'Villa Sereno',
      tripType: 'Honeymoon',
      date: 'June 2026',
      rating: 5,
      text: "Villa Sereno transcended every expectation. The staff anticipated needs we didn't know we had. The jungle views from the master suite are permanently etched in my memory. We have already reserved our return for next June.",
    },
    {
      id: 'rev-2',
      guest: 'Sebastian Vogt',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      property: 'Villa Sereno',
      tripType: 'Anniversary',
      date: 'May 2026',
      rating: 5,
      text: 'The private chef prepared a seven-course dinner using ingredients sourced from the morning market in Ubud. The yoga pavilion at dawn is otherworldly. Nothing compares.',
    },
    {
      id: 'rev-3',
      guest: 'Amara Okafor',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
      property: 'Azure Heights',
      tripType: 'Solo Travel',
      date: 'July 2026',
      rating: 5,
      text: 'I have stayed at perhaps thirty luxury properties around the world. The caldera view from Azure Heights at sunset is the single most beautiful thing I have witnessed from a window. Extraordinary.',
    },
    {
      id: 'rev-4',
      guest: 'Thomas & Eliza Crawford',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=100&q=80',
      property: 'Cedar Peak Lodge',
      tripType: 'Family Holiday',
      date: 'January 2026',
      rating: 5,
      text: 'We brought four families together for a ski week at Cedar Peak. The fireplace, the hot tub under the stars, the space for everyone to gather — it made the whole trip effortless.',
    },
  ]);

  approveReview(id: string): void {
    // placeholder for approve/verify action
  }

  deleteReview(id: string): void {
    this.reviews.update((list) => list.filter((r) => r.id !== id));
  }
}
