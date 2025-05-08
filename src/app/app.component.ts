import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LeavesComponent } from './leaves/leaves.component';
import { AudioButtonComponent } from './audio-button/audio-button.component';
import { DayNightButtonComponent } from './day-night-button/day-night-button.component';
import { DayNightService } from '../services/day-night.service';
import { SoundscapeService } from '../services/soundscape.service';
import { ImagePreloaderService } from '../services/image-preloader.service';
import { AudioService } from '../services/audio.service';
import { Subject, takeUntil } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
import { BackgroundComponent } from "./background/background.component";

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
    BackgroundComponent
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

  constructor() {}

  ngOnInit(): void {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseleave', this.handleMouseUp);

    this.imagePreloaderService.backgroundImagesLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        console.log('Background images loaded state:', loaded);
        this.imagesLoaded = loaded;
        if (loaded) {
          this.titleState = 'visible';
        }
      });

    this.imagePreloaderService.preloadLeafImages().then(() => {
      console.log('All images preloaded, app ready for animation');
    });

    this.soundscapeService.audioReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ready) => {
        console.log('All audio ready state changed:', ready);
        this.audioReady = ready;
      });

    this.soundscapeService.dayAudioReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ready) => {
        console.log('Day audio ready state changed:', ready);
        this.updateCurrentModeAudioReady();
      });

    this.soundscapeService.nightAudioReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ready) => {
        console.log('Night audio ready state changed:', ready);
        this.updateCurrentModeAudioReady();
      });

    this.dayNightService.mode$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateCurrentModeAudioReady();
    });
  }

  private updateCurrentModeAudioReady(): void {
    this.currentModeAudioReady = this.soundscapeService.currentModeAudioReady;
    console.log('Current mode audio ready:', this.currentModeAudioReady);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseleave', this.handleMouseUp);
  }

  onTitleClick() {
    this.titleState = 'hiding';
    setTimeout(() => {
      this.titleState = 'hidden';
    }, 2000);
  }

  private handleMouseDown = (): void => {
    document.body.classList.add('ant-grabbing');
  };

  private handleMouseUp = (): void => {
    document.body.classList.remove('ant-grabbing');
  };
}
