import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;
  showRegister: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogOut() {
    this.authService.logOut();
    this.flashMsg.show('You are now logged out', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
    this.router.navigate(['/login']);
  }
}
