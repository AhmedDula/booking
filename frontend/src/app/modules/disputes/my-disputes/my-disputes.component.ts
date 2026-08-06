import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DisputeService } from '../dispute.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-disputes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-disputes.component.html',
  styleUrl: './my-disputes.component.scss'
})
export class MyDisputesComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly disputeService = inject(DisputeService);

  currentUser = this.authService.currentUser();

  disputes = signal<any[]>([]);

  ngOnInit(): void {
    if (!this.currentUser) {
      return;
    }

    this.disputeService.getDisputes().subscribe({
      next: (res: any) => {
        this.disputes.set(res.data);
      },
      error: (err: any) => {
        console.error('Error loading disputes:', err);
      }
    });
  }
}