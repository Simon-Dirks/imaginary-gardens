import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayNightService } from '../../services/day-night.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  animations: [
    trigger('titleAnimation', [
      state(
        'visible',
        style({
          opacity: 1,
        }),
      ),
      state(
        'hiding',
        style({
          opacity: 0,
        }),
      ),
      state(
        'hidden',
        style({
          opacity: 0,
        }),
      ),
      transition('visible => hiding', [animate('2000ms ease-out')]),
      transition('hidden => visible', [animate('4000ms 1.5s ease-out')]),
    ]),
  ],
})
export class TitleComponent implements OnInit {
  @Input() titleState: string = 'visible';
  @Input() showInCorner: boolean = false;

  public dayNightService = inject(DayNightService);
  public indexService = inject(IndexService);

  public showDayGif = this.dayNightService.currentMode === 'day';
  public showNightGif = this.dayNightService.currentMode === 'night';
  private lastMode: 'day' | 'night' = this.dayNightService.currentMode;
  private fadeTimeout: number | null = null;

  get textColor(): string {
    return this.dayNightService.currentMode === 'day'
      ? 'rgb(0,0,0)'
      : 'rgb(230,230,230)';
  }

  constructor() {}

  ngOnInit(): void {
    this.lastMode = this.dayNightService.currentMode;
    this.dayNightService.mode$.subscribe((mode) => {
      if (mode !== this.lastMode) {
        if (this.fadeTimeout !== null) {
          clearTimeout(this.fadeTimeout);
          this.fadeTimeout = null;
        }

        if (mode === 'night') {
          // Fade out day, then show night
          this.showDayGif = false;
          this.showNightGif = false;
          this.fadeTimeout = window.setTimeout(() => {
            this.showNightGif = true;
            this.fadeTimeout = null;
          }, 1000);
        } else {
          // Fade out night, then show day
          this.showNightGif = false;
          this.showDayGif = false;
          this.fadeTimeout = window.setTimeout(() => {
            this.showDayGif = true;
            this.fadeTimeout = null;
          }, 1000);
        }
        this.lastMode = mode;
      }
    });
  }
}
