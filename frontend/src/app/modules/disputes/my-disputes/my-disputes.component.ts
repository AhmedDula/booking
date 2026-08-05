import { Component, inject, OnInit } from '@angular/core';
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
  private readonly currentUser = inject(AuthService).currentUser();
  private readonly disputeService = inject(DisputeService);

  disputes: any[] = [];

  ngOnInit() {
    if (this.currentUser) {
      this.disputeService.getDisputes().subscribe({
        next: (res:any) => {
          console.log(res);
          this.disputes = res.data || res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  
}

