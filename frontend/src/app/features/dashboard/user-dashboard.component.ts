




import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// لو عندك سيرفر خاص باليوزر بتستدعيه هنا، مثلاً:
// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-user-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './user-dashboard.component.html',
//   styleUrls: ['./user-dashboard.component.scss']
// })
// export class UserDashboardComponent implements OnInit {
//    private userService = inject(UserService);

//   userInfo: any = {
//     name: 'أمينا شنودة',
//     email: 'amira@example.com',
//     role: 'User'
//   };

//   userBookings: any[] = [];
//   ngOnInit() {
//     this.loadUserData();
//   }

//   loadUserData() {

//      this.userService.getProfile().subscribe(data => this.userInfo = data);
//   }
// }
