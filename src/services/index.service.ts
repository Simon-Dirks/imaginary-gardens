import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IndexService {
  private _showing = new BehaviorSubject<boolean>(false);
  public showing$ = this._showing.asObservable();

  get isShowing(): boolean {
    return this._showing.value;
  }

  toggle(): void {
    this._showing.next(!this._showing.value);
  }

  show(): void {
    this._showing.next(true);
  }

  hide(): void {
    this._showing.next(false);
  }
}
