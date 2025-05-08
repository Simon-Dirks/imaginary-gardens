import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexService } from '../../services/index.service';
import { DayNightService } from '../../services/day-night.service';

@Component({
  selector: 'app-index-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index-button.component.html',
  styleUrl: './index-button.component.scss',
})
export class IndexButtonComponent {
  private indexService = inject(IndexService);
  private dayNightService = inject(DayNightService);

  get isShowing(): boolean {
    return this.indexService.isShowing;
  }

  get mode(): 'day' | 'night' {
    return this.dayNightService.currentMode;
  }

  toggleIndex(): void {
    this.indexService.toggle();
  }
}
