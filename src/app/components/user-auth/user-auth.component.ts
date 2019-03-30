import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IdentityProvider } from '../../models/identity-provider';
import { ModalService } from '../../services/modal.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'user-auth',
  styleUrls: [
    './user-auth.component.scss'
  ],
  templateUrl: './user-auth.component.pug'
})
export class UserAuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private modalService: ModalService) {
  }

  public ngOnInit() {
    this.authService.userAuth$.subscribe((userAuth) => {
      if (userAuth) {
        console.log(`Welcome, ${userAuth.displayName}!`);
      } else {
        console.log('The user is not logged in.');
      }
    });
  }

  public onLoginClicked(): void {
    let identityProviders = [new IdentityProvider({
      clientId: '965333333109-fsvv8gv885e5e3bksjvvsmq1k9jj19gc.apps.googleusercontent.com',
      displayName: 'Google',
      iconUrl: 'https://banner2.kisspng.com/20180324/sww/kisspng-google-logo-g-suite-chrome-5ab6e618b3b2c3.5810634915219358967361.jpg',
      authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
    })];

    this.modalService.showModal(LoginModalComponent, { identityProviders: identityProviders })
      .pipe(filter(Boolean)).subscribe((identityProvider) => {
        this.authService.loginWithIdentityProvider(identityProvider);
      });
  }
}
