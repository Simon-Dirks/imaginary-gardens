import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AudioMode = 'on' | 'off';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private _mode = new BehaviorSubject<AudioMode>('off');
  public mode$ = this._mode.asObservable();

  constructor() {}

  public get currentMode(): AudioMode {
    return this._mode.value;
  }

  public toggle(): void {
    const newMode = this._mode.value === 'on' ? 'off' : 'on';
    this._mode.next(newMode);
  }
}
