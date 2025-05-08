import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DayNightService } from '../../services/day-night.service';

@Component({
  selector: 'app-background',
  imports: [NgClass],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent {
  @Input() imagesLoaded = false;

  private dayNightService = inject(DayNightService);

  get isDayMode(): boolean {
    return this.dayNightService.currentMode === 'day';
  }
}
