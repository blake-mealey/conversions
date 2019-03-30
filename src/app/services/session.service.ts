import { IdentityProvider } from '../models/identity-provider';
import { UserAuth } from '../models/user-auth';

export class SessionService {
  private static readonly STATE_TOKEN_KEY = 'stateToken';
  private static readonly NONCE_KEY = 'nonce';
  private static readonly IDENTITY_PROVIDER_KEY = 'identityProvider';
  private static readonly USER_AUTH_KEY = 'userAuth';

  //region Helpers
  private set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  private remove(key: string): void {
    localStorage.removeItem(key);
  }
  //endregion

  public clear(): void {
    localStorage.clear();
  }

  //region Properties
  public setStateToken(stateToken: string) {
    this.set(SessionService.STATE_TOKEN_KEY, stateToken);
  }

  public getStateToken(): string {
    return this.get(SessionService.STATE_TOKEN_KEY);
  }

  public clearStateToken(): void {
    return this.remove(SessionService.STATE_TOKEN_KEY);
  }

  public setNonce(nonce: string) {
    this.set(SessionService.NONCE_KEY, nonce);
  }

  public getNonce(): string {
    return this.get(SessionService.NONCE_KEY);
  }

  public clearNonce(): void {
    return this.remove(SessionService.NONCE_KEY);
  }

  public setIdentityProvider(identityProvider: IdentityProvider) {
    this.set(SessionService.IDENTITY_PROVIDER_KEY, identityProvider);
  }

  public getIdentityProvider(): IdentityProvider {
    return new IdentityProvider(this.get(SessionService.IDENTITY_PROVIDER_KEY));
  }

  public clearIdentityProvider(): void {
    return this.remove(SessionService.IDENTITY_PROVIDER_KEY);
  }

  public setUserAuth(userAuth: UserAuth) {
    this.set(SessionService.USER_AUTH_KEY, userAuth);
  }

  public getUserAuth(): UserAuth {
    return new UserAuth(this.get(SessionService.USER_AUTH_KEY));
  }

  public clearUserAuth(): void {
    return this.remove(SessionService.USER_AUTH_KEY);
  }
  //endregion
}
