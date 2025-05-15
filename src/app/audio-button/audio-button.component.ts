import { Component, inject } from '@angular/core';
import { AudioService, AudioMode } from '../../services/audio.service';
import { DayNightService } from '../../services/day-night.service';

@Component({
  selector: 'app-audio-button',
  standalone: true,
  imports: [],
  templateUrl: './audio-button.component.html',
  styleUrl: './audio-button.component.scss',
})
export class AudioButtonComponent {
  private audioService = inject(AudioService);
  private dayNightService = inject(DayNightService);

  get mode(): AudioMode {
    return this.audioService.currentMode;
  }

  get isDayMode(): boolean {
    return this.dayNightService.currentMode === 'day';
  }

  toggleAudio(): void {
    this.audioService.toggle();
  }
}
