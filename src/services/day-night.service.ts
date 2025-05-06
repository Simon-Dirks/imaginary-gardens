import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DayNightMode = 'day' | 'night';

@Injectable({
  providedIn: 'root'
})
export class DayNightService {
  private _mode = new BehaviorSubject<DayNightMode>('day');
  public mode$ = this._mode.asObservable();

  constructor() {
    // Initialize from localStorage if available
    const savedMode = localStorage.getItem('dayNightMode');
    if (savedMode === 'day' || savedMode === 'night') {
      this._mode.next(savedMode);
    }
  }

  public get currentMode(): DayNightMode {
    return this._mode.value;
  }

  public toggle(): void {
    const newMode = this._mode.value === 'day' ? 'night' : 'day';
    this._mode.next(newMode);
    localStorage.setItem('dayNightMode', newMode);
  }
}
