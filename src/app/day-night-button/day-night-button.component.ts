import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DayNightService, DayNightMode } from '../services/day-night.service';

@Component({
  selector: 'app-day-night-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './day-night-button.component.html',
  styleUrl: './day-night-button.component.scss'
})
export class DayNightButtonComponent {
  private dayNightService = inject(DayNightService);
  
  get mode(): DayNightMode {
    return this.dayNightService.currentMode;
  }
  
  toggleMode(): void {
    this.dayNightService.toggle();
  }
}
