import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DayNightMode = 'day' | 'night';

@Injectable({
  providedIn: 'root',
})
export class DayNightService {
  private _mode = new BehaviorSubject<DayNightMode>('day');
  public mode$ = this._mode.asObservable();

  constructor() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 20 || hour < 7) {
      this._mode.next('night');
    } else {
      this._mode.next('day');
    }
  }

  public get currentMode(): DayNightMode {
    return this._mode.value;
  }

  public toggle(): void {
    const newMode = this._mode.value === 'day' ? 'night' : 'day';
    this._mode.next(newMode);
  }
}
