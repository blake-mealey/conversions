import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IdentityProvider } from '../../models/identity-provider';
import { ModalService } from '../../services/modal.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { UserAuth } from '../../models/user-auth';
import { MenuItem } from '../../../material-design/components/md-menu/menu-item';

enum ProfileMenuItem {
  LOGOUT
}

@Component({
  selector: 'user-auth',
  styleUrls: [
    './user-auth.component.scss'
  ],
  templateUrl: './user-auth.component.pug'
})
export class UserAuthComponent implements OnInit {

  private identityProviders: IdentityProvider[];

  public userAuth: UserAuth;

  public profileMenuItems: MenuItem[];

  constructor(private authService: AuthService,
              private modalService: ModalService,
              private apiService: ApiService) {
    this.profileMenuItems = [new MenuItem(ProfileMenuItem.LOGOUT, 'Logout')];
  }

  public ngOnInit() {
    this.apiService.getIdentityProviders().subscribe((identityProviders) => {
      this.identityProviders = identityProviders;
    });

    this.authService.userAuth$.subscribe((userAuth) => {
      this.userAuth = userAuth;
    });
  }

  public onLoginClicked(): void {
    this.modalService.showModal(LoginModalComponent, { identityProviders: this.identityProviders })
      .pipe(filter(Boolean)).subscribe((identityProvider) => {
        this.authService.loginWithIdentityProvider(identityProvider);
      });
  }
}
