import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IdentityProvider } from '../../models/identity-provider';
import { ModalService } from '../../../app-common/services/modal.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { filter, share } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { UserAuth } from '../../models/user-auth';
import { MenuItem } from '../../../material-design/components/md-menu/menu-item';
import { Observable } from 'rxjs';

enum ProfileMenuItem {
  SIGN_OUT
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

  public userAuth: Observable<UserAuth>;

  public profileMenuItems: MenuItem[];

  constructor(private authService: AuthService,
              private modalService: ModalService,
              private apiService: ApiService) {
    this.profileMenuItems = [new MenuItem(ProfileMenuItem.SIGN_OUT, 'Sign out')];
  }

  public ngOnInit() {
    this.apiService.getIdentityProviders().subscribe((identityProviders) => {
      this.identityProviders = identityProviders;
    });

    this.userAuth = this.authService.userAuth$.pipe(share());
  }

  public onLoginClicked(): void {
    this.modalService.showModal(LoginDialogComponent, { identityProviders: this.identityProviders })
      .pipe(filter(Boolean)).subscribe((identityProvider) => {
        this.authService.loginWithIdentityProvider(identityProvider);
      });
  }

  public onProfileMenuItemSelected(profileMenuItem: ProfileMenuItem): void {
    if (profileMenuItem === ProfileMenuItem.SIGN_OUT) {
      this.authService.logout();
    }
  }
}
