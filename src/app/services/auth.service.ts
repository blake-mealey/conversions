import { Injectable } from '@angular/core';
import { IdentityProvider } from 'app/models/identity-provider';
import { HttpRequest } from './http-request';
import { AuthResponse } from 'app/models/auth-response';
import { ApiService } from './api.service';
import { AuthParameters } from 'app/models/auth-parameters';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuth } from 'app/models/user-auth';
import { AuthSessionResult } from '../models/broadcast-messages/auth-session-result';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  /**
   * Defines the default settings for the authentication popup
   */
  private readonly popupProperties = {
    width: 605,
    height: 600,
    top: 0,
    left: 0,
    resizable: 'no',
    scrollbars: 'no',
    toolbar: 'no',
    menubar: 'no',
    location: 'no',
    status: 'yes',
    centerscreen: 'yes',
    chrome: 'yes'
  };

  private userAuth: BehaviorSubject<UserAuth>;
  public userAuth$: Observable<UserAuth>;

  private popupReference: any;
  private popupChannel: BroadcastChannel;

  constructor(private apiService: ApiService,
              private sessionService: SessionService) {
    this.userAuth = new BehaviorSubject<UserAuth>(this.getUserAuth());
    this.userAuth$ = this.userAuth.asObservable();

    this.popupChannel = new BroadcastChannel('auth-session');
    this.popupChannel.onmessage = (result: MessageEvent) =>
      this.handleAuthSessionResult(<AuthSessionResult>result.data);
  }

  private getUserAuth(): UserAuth {
    try {
      return this.sessionService.getUserAuth();
    } catch (e) {
      return null;
    }
  }

  private handleAuthSessionResult(result: AuthSessionResult): void {
    if (result.success) {
      this.userAuth.next(result.userAuth);
    } else {
      this.authenticationError();
    }
    this.popupReference.close();
    this.popupReference = null;
  }

  /**
   * Opens up a popup to login with an identity provider
   *
   * @param identityProvider the identity provider to authenticate with
   */
  public loginWithIdentityProvider(identityProvider: IdentityProvider): void {
    const url = this.getAuthorizationUrl(identityProvider);

    this.sessionService.setIdentityProvider(identityProvider);

    if (!this.popupReference || this.popupReference.closed) {
      // Center the popup
      this.popupProperties.top = 0.5 * (window.screen.height - this.popupProperties.height);
      this.popupProperties.left = 0.5 * (window.screen.width - this.popupProperties.width);

      // Serialize the popup properties
      const properties = Object.keys(this.popupProperties).reduce(
        (acc, key) => acc.concat(`${key}=${this.popupProperties[key]}`), []).join(',');

      // Show the popup
      this.popupReference = window.open(url, 'popUpWindow', properties);
    } else {
      // Focus the existing popup
      this.popupReference.focus();
    }
  }

  /**
   * Validates the auth response from the auth redirect handler
   *
   * @param authResponse the response from the identity provider after authenticating
   * @returns whether or not the response is valid
   */
  public validateAuthResponse(authResponse: AuthResponse): boolean {
    // TODO: Check for error code/message in auth response

    if (!this.isValidStateToken(authResponse.state)) {
      this.authenticationError();
      return false;
    }

    if (!authResponse.code) {
      this.authenticationError();
      return false;
    }

    return true;
  }

  /**
   * Gets an authorization token
   *
   * @param authResponse the response from the identity provider after the user authenticated with them
   * @returns {Observable<UserAuth>} an observable of an authorization token
   */
  public getAuthToken(authResponse: AuthResponse): Observable<UserAuth> {
    const nonce = this.sessionService.getNonce();
    this.sessionService.clearNonce();

    const identityProvider = this.sessionService.getIdentityProvider();
    this.sessionService.clearIdentityProvider();

    return this.apiService.getAuthToken(new AuthParameters({
      clientId: identityProvider.clientId,
      redirectUri: this.getRedirectUri(),
      code: authResponse.code,
      nonce,
    }));
  }

  /**
   * Stores the user auth in session storage and closes the window (which is the popup)
   *
   * @param userAuth the user auth to store in session storage
   */
  public finishAuthenticating(userAuth: UserAuth): void {
    this.sessionService.setUserAuth(userAuth);
    this.popupChannel.postMessage(new AuthSessionResult(true, null, userAuth));
  }

  /**
   * Closes the authentication popup.
   * TODO: display an error somewhere
   */
  public authenticationError(): void {
    if (this.popupReference) {
      this.popupReference.close();
    } else {
      this.popupChannel.postMessage(new AuthSessionResult(false, '', null));
    }
  }

  /**
   * @returns whether or not the response state token exists and matches the one stored in session
   * storage
   */
  private isValidStateToken(responseStateToken: string): boolean {
    const stateToken = this.sessionService.getStateToken();
    this.sessionService.clearStateToken();
    return responseStateToken && stateToken === responseStateToken;
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

    // Genreate a nonce and save it in session storage
    const nonce = this.generateNonce();
    this.sessionService.setNonce(nonce);

    // Build and return the URL
    return new HttpRequest(null, identityProvider.authorizationEndpoint)
      .parameter('client_id', identityProvider.clientId)
      .parameter('response_type', 'code')
      .parameter('scope', 'openid profile')
      .parameter('redirect_uri', this.getRedirectUri())
      .parameter('state', stateToken)
      .parameter('nonce', nonce)
      .toString();
  }

  /**
   * @returns {string} the redirect URI relative to the current URL's origin
   */
  private getRedirectUri(): string {
    return window.location.origin + '/auth/redirect';
  }

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
}
