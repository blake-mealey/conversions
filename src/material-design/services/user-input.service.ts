import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserInputService {

  private mouseClick: Subject<MouseEvent>;
  public mouseClick$: Observable<MouseEvent>;

  private keyDown: Subject<KeyboardEvent>;
  public keyDown$: Observable<KeyboardEvent>;

  constructor() {
    this.mouseClick = new Subject();
    this.mouseClick$ = this.mouseClick.asObservable();

    this.keyDown = new Subject();
    this.keyDown$ = this.keyDown.asObservable();

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.target == window.document.body) {
        this.keyDown.next(event);
      }
    });

    window.addEventListener('mouseup', (event: MouseEvent) => {
      this.mouseClick.next(event);
    });
  }

  registerHotkey(key: string, callback: (event: KeyboardEvent) => void) {
    this.keyDown$.subscribe((event) => {
      if (event.key == key) {
        callback(event);
      }
    });
  }

}
