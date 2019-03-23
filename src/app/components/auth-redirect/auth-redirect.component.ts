import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { AuthResponse } from 'app/models/auth-response';

@Component({
  selector: 'auth-redirect',
  styleUrls: [
    './auth-redirect.component.scss'
  ],
  templateUrl: './auth-redirect.component.pug'
})
export class AuthRedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService) {}

  public ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);

    let authResponse: AuthResponse;
    try {
      authResponse = new AuthResponse(this.route.snapshot.queryParams);
    } catch {
      this.authService.authenticationError('Invalid auth response :(');
    }

    if (!this.authService.validateAuthResponse(authResponse)) {
      return;
    }

    this.authService.getAuthToken(authResponse).subscribe((userAuth) => {
      this.authService.finishAuthenticating(userAuth);
    });
  }

}
