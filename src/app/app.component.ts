import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LeavesComponent } from './leaves/leaves.component';
import { AudioButtonComponent } from './audio-button/audio-button.component';
import { DayNightButtonComponent } from './day-night-button/day-night-button.component';
import { DayNightService } from './services/day-night.service';
import { SoundscapeService } from './services/soundscape.service';
import { ImagePreloaderService } from './services/image-preloader.service';
import { AudioService } from './services/audio.service';
import { Subject, takeUntil } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';

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
  animations: [
    trigger('fadeInControls', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('4s ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'imaginary-gardens';
  titleState: 'visible' | 'hiding' | 'hidden' = 'hidden';
  audioReady = false;
  currentModeAudioReady = false;
  imagesLoaded = false;
  private destroy$ = new Subject<void>();
  private dayNightService = inject(DayNightService);
  private imagePreloaderService = inject(ImagePreloaderService);
  private soundscapeService = inject(SoundscapeService);

  get isDayMode(): boolean {
    return this.dayNightService.currentMode === 'day';
  }

  constructor() {}

  ngOnInit(): void {
    // Subscribe to background images loaded state
    this.imagePreloaderService.backgroundImagesLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        console.log('Background images loaded state:', loaded);
        this.imagesLoaded = loaded;
        if (loaded) {
          this.titleState = 'visible';
        }
      });

    // Preload all images (including background images)
    this.imagePreloaderService.preloadLeafImages().then(() => {
      console.log('All images preloaded, app ready for animation');
    });

    // Subscribe to audio ready states
    this.soundscapeService.audioReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ready) => {
        console.log('All audio ready state changed:', ready);
        this.audioReady = ready;
      });

    // Subscribe to day audio ready state
    this.soundscapeService.dayAudioReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ready) => {
        console.log('Day audio ready state changed:', ready);
        this.updateCurrentModeAudioReady();
      });

    // Subscribe to night audio ready state
    this.soundscapeService.nightAudioReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ready) => {
        console.log('Night audio ready state changed:', ready);
        this.updateCurrentModeAudioReady();
      });

    // Subscribe to day/night mode changes
    this.dayNightService.mode$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateCurrentModeAudioReady();
    });
  }

  // Update the current mode audio ready state
  private updateCurrentModeAudioReady(): void {
    this.currentModeAudioReady = this.soundscapeService.currentModeAudioReady;
    console.log('Current mode audio ready:', this.currentModeAudioReady);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTitleClick() {
    this.titleState = 'hiding';
    setTimeout(() => {
      this.titleState = 'hidden';
    }, 2000);
  }
}
