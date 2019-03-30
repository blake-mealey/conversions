import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IdentityProvider } from '../../models/identity-provider';
import { ModalService } from '../../services/modal.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'user-auth',
  styleUrls: [
    './user-auth.component.scss'
  ],
  templateUrl: './user-auth.component.pug'
})
export class UserAuthComponent implements OnInit {

  private identityProviders: IdentityProvider[];

  constructor(private authService: AuthService,
              private modalService: ModalService,
              private apiService: ApiService) {
    this.apiService.getIdentityProviders().subscribe((identityProviders) => {
      this.identityProviders = identityProviders;
    });
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
    this.modalService.showModal(LoginModalComponent, { identityProviders: this.identityProviders })
      .pipe(filter(Boolean)).subscribe((identityProvider) => {
        this.authService.loginWithIdentityProvider(identityProvider);
      });
  }
}
