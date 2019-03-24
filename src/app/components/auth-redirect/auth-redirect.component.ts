import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { AuthResponse } from 'app/models/auth-response';
import { AuthWindow } from '../../services/auth/auth-window';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { UserAuth } from '../../models/user-auth';
import { AuthParameters } from '../../models/auth-parameters';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'auth-redirect',
  styleUrls: [
    './auth-redirect.component.scss'
  ],
  templateUrl: './auth-redirect.component.pug'
})
export class AuthRedirectComponent implements OnInit {

  private broadcastChannel: BroadcastChannel;

  constructor(private route: ActivatedRoute,
              private sessionService: SessionService,
              private apiService: ApiService) {}

  public ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);

    this.broadcastChannel = new BroadcastChannel(AuthWindow.BROADCAST_CHANNEL_NAME);

    let authResponse: AuthResponse;
    try {
      authResponse = new AuthResponse(this.route.snapshot.queryParams);
    } catch {
      this.broadcastChannel.postMessage('Invalid auth response :(');
      return;
    }

    if (!this.validateAuthResponse(authResponse)) {
      return;
    }

    this.getAuthToken(authResponse).subscribe((userAuth) => {
      this.broadcastChannel.postMessage(userAuth);
    });
  }

  /**
   * Validates the auth response from the auth redirect handler
   *
   * @param authResponse the response from the identity provider after authenticating
   * @returns whether or not the response is valid
   */
  private validateAuthResponse(authResponse: AuthResponse): boolean {
    // TODO: Check for error code/message in auth response

    if (!this.isValidStateToken(authResponse.state)) {
      this.broadcastChannel.postMessage('The state token does not match.');
      return false;
    }

    if (!authResponse.code) {
      this.broadcastChannel.postMessage('No authorization code.');
      return false;
    }

    return true;
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
   * Gets an authorization token
   *
   * @param authResponse the response from the identity provider after the user authenticated with them
   * @returns {Observable<UserAuth>} an observable of an authorization token
   */
  private getAuthToken(authResponse: AuthResponse): Observable<UserAuth> {
    const nonce = this.sessionService.getNonce();
    this.sessionService.clearNonce();

    const identityProvider = this.sessionService.getIdentityProvider();
    this.sessionService.clearIdentityProvider();

    return this.apiService.getAuthToken(new AuthParameters({
      clientId: identityProvider.clientId,
      redirectUri: AuthService.getRedirectUri(),
      code: authResponse.code,
      nonce,
    }));
  }

}
