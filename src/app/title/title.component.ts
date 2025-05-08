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
        })
      ),
      state(
        'hiding',
        style({
          opacity: 0,
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      transition('visible => hiding', [animate('2000ms ease-out')]),
      transition('hidden => visible', [animate('4000ms 1.5s ease-out')]),
    ]),
  ],
})
export class TitleComponent implements OnInit {
  @Input() titleState: string = 'visible';
  private dayNightService = inject(DayNightService);

  get textColor(): string {
    return this.dayNightService.currentMode === 'day' ? 'rgb(0,0,0)' : 'rgb(230,230,230)';
  }

  constructor() {}

  ngOnInit(): void {}
}
