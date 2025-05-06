import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AudioService, AudioMode } from '../../services/audio.service';

@Component({
  selector: 'app-audio-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './audio-button.component.html',
  styleUrl: './audio-button.component.scss',
})
export class AudioButtonComponent {
  private audioService = inject(AudioService);

  get mode(): AudioMode {
    return this.audioService.currentMode;
  }

  toggleAudio(): void {
    this.audioService.toggle();
  }
}
