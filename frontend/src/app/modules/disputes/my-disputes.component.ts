import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DisputeService } from './dispute.service';

@Component({
  selector: 'app-my-disputes',
  standalone: true,
  imports: [],
  templateUrl: './my-disputes.component.html',
  styleUrl: './my-disputes.component.scss'
})
export class MyDisputesComponent implements OnInit {
  private readonly currentUser = inject(AuthService).currentUser();
  private readonly disputeService = inject(DisputeService);
  ngOnInit() {
    if (this.currentUser) {
      this.disputeService.getDisputes().subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  

}
