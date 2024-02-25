import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor(private userSerivce: UserAuthService, private router: Router) {}
  ngOnInit(): void {
    this.state();
  }
  state() {
    this.userSerivce.getUserState().subscribe({
      next: (state) => {
        this.isLoggedIn = state;
      },
    });
  }
  changeState() {
    if (this.isLoggedIn) {
      this.userSerivce.logout();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
