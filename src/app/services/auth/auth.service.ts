import { Injectable } from '@angular/core';
import { IdentityProvider } from 'app/models/identity-provider';
import { HttpRequest } from '../http-request';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuth } from 'app/models/user-auth';
import { SessionService } from '../session.service';
import { AuthWindow } from './auth-window';

@Injectable()
export class AuthService {
  private userAuth: BehaviorSubject<UserAuth>;
  public userAuth$: Observable<UserAuth>;

  private authWindow: AuthWindow;

  constructor(private apiService: ApiService,
              private sessionService: SessionService) {
    this.userAuth = new BehaviorSubject<UserAuth>(this.getUserAuthFromSessionStorage());
    this.userAuth$ = this.userAuth.asObservable();
  }

  private getUserAuthFromSessionStorage(): UserAuth {
    try {
      return this.sessionService.getUserAuth();
    } catch (e) {
      return null;
    }
  }

  /**
   * Opens up a popup to login with an identity provider
   *
   * @param identityProvider the identity provider to authenticate with
   */
  public loginWithIdentityProvider(identityProvider: IdentityProvider): void {
    this.sessionService.setIdentityProvider(identityProvider);

    const url = this.getAuthorizationUrl(identityProvider);

    if (!this.authWindow || this.authWindow.closed) {
      this.authWindow = new AuthWindow(this.sessionService, url);
      this.authWindow.userAuth$.subscribe((userAuth: UserAuth) => {
        this.userAuth.next(userAuth);
        this.sessionService.setUserAuth(userAuth);
      }, (message: string) => {
        this.authenticationError(message);
      });
    } else {
      this.authWindow.focus();
    }
  }

  /**
   * Closes the authentication popup.
   * TODO: display an error somewhere
   */
  public authenticationError(message: string): void {
    console.error(message);
    if (this.authWindow) {
      this.authWindow.close();
    }
  }

  /**
   * Builds an authorizaion URL for the identity provider. Also generates and stores a state token
   * and a nonce
   *
   * @param identityProvider the identity provider to build an authorization URL for
   * @returns {string} the authorization URL
   */
  private getAuthorizationUrl(identityProvider: IdentityProvider): string {
    // Generate a state token and save it in session storage
    const stateToken = this.generateStateToken();
    this.sessionService.setStateToken(stateToken);

    // Generate a nonce and save it in session storage
    const nonce = this.generateNonce();
    this.sessionService.setNonce(nonce);

    // Build and return the URL
    return new HttpRequest(null, identityProvider.authorizeUrl)
      .parameter('client_id', identityProvider.clientId)
      .parameter('response_type', 'code')
      .parameter('scope', 'openid profile')
      .parameter('redirect_uri', AuthService.getRedirectUri())
      .parameter('state', stateToken)
      .parameter('nonce', nonce)
      .toString();
  }

  /**
   * @returns {string} the redirect URI relative to the current URL's origin
   */
  public static getRedirectUri(): string {
    return window.location.origin + '/auth/redirect';
  }

  //region Random values
  /**
   * Generates a random string using characters from a charset with a given length
   *
   * @param charset the set of characters to build the string from
   * @param length the length of the string to generate
   * @returns {string} the generated random string
   */
  private generateRandomString(charset: string, length: number): string {
    const result = [];
    window.crypto.getRandomValues(new Uint8Array(length)).forEach((c) =>
      result.push(charset[c % charset.length]));
    return result.join('');
  }

  /**
   * Generates a state token for OpenID Connect
   */
  private generateStateToken(): string {
    return this.generateRandomString('0123456789', 32);
  }

  /**
   * Generates a nonce for OAuth 2.0
   */
  private generateNonce(): string {
    return this.generateRandomString(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~', 32);
  }
  //endregion
}
