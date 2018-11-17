import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class UserInputService {

  private mouseClick = new Subject<MouseEvent>();
  public mouseClick$ = this.mouseClick.asObservable();

  private keyDown = new Subject<KeyboardEvent>();
  public keyDown$ = this.keyDown.asObservable();

  constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.target == window.document.body) {
        this.keyDown.next(event);
      }
    });

    window.addEventListener('mouseup', (event: MouseEvent) => {
      this.mouseClick.next(event);
    });
  }

  registerHotkey(key: string, callback: (event: KeyboardEvent) => void): Subscription {
    return this.keyDown$.subscribe((event) => {
      if (event.key == key) {
        callback(event);
      }
    });
  }

}
