import { SessionService } from '../session.service';
import { Observable } from 'rxjs';
import { UserAuth } from '../../models/user-auth';

export class AuthWindow {
  public static readonly BROADCAST_CHANNEL_NAME: string = 'auth-window';

  /**
   * Defines the default config for the authentication window
   */
  private windowConfig = {
    width: 605,
    height: 600,
    top: 0,
    left: 0,
    resizable: 'no',
    scrollbars: 'no',
    toolbar: 'no',
    menubar: 'no',
    location: 'no',
    status: 'yes'
  };

  private broadcastChannel: BroadcastChannel;
  private window: Window;

  public get closed() {
    return this.window.closed;
  }

  public userAuth$: Observable<UserAuth>;

  constructor(private sessionService: SessionService,
              private url: string) {
    this.initializeBroadcastChannel();

    this.centerWindow();
    const config = this.getConfigString();
    this.window = window.open(this.url, 'popUpWindow', config);
  }

  private initializeBroadcastChannel() {
    this.broadcastChannel = new BroadcastChannel(AuthWindow.BROADCAST_CHANNEL_NAME);

    this.userAuth$ = new Observable<UserAuth>((observer) => {
      this.broadcastChannel.onmessage = (event: MessageEvent) => {
        if (typeof event.data === 'string') {
          observer.error(<string>event.data);
        } else {
          observer.next(<UserAuth>event.data);
          observer.complete();
        }
        this.close();
      };
    });
  }

  private centerWindow(): void {
    this.windowConfig.top = 0.5 * (window.screen.height - this.windowConfig.height);
    this.windowConfig.left = 0.5 * (window.screen.width - this.windowConfig.width);
  }

  private getConfigString(): string {
    return Object.keys(this.windowConfig).reduce(
      (acc, key) => acc.concat(`${key}=${this.windowConfig[key]}`), []).join(',');
  }

  public close(): void {
    this.window.close();
    this.broadcastChannel.close();
  }

  public focus(): void {
    this.window.focus();
  }
}
