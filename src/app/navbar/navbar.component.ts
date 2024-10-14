import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username = 'username'; // Replace with actual username from a service

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout().subscribe({
      complete: () => {
        this.router.navigate(['/login']);
        this.snackbar.open('Logged out successfully', 'Close');
      },
    });
  }
}
