import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LeavesComponent } from './leaves/leaves.component';
import { AudioButtonComponent } from './audio-button/audio-button.component';
import { DayNightButtonComponent } from './day-night-button/day-night-button.component';
import { DayNightService } from './services/day-night.service';
import { SoundscapeService } from './services/soundscape.service';
import { ImagePreloaderService } from './services/image-preloader.service';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    TitleComponent,
    LeavesComponent,
    AudioButtonComponent,
    DayNightButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'imaginary-gardens';
  titleState: 'visible' | 'hiding' | 'hidden' = 'visible';
  private dayNightService = inject(DayNightService);
  private imagePreloaderService = inject(ImagePreloaderService);
  private soundscapeService = inject(SoundscapeService);

  get isDayMode(): boolean {
    return this.dayNightService.currentMode === 'day';
  }

  constructor() {}

  ngOnInit(): void {
    this.imagePreloaderService.preloadLeafImages().then(() => {
      console.log('Images preloaded, app ready for animation');
    });
  }

  onTitleClick() {
    this.titleState = 'hiding';
    setTimeout(() => {
      this.titleState = 'hidden';
    }, 2000);
  }
}
