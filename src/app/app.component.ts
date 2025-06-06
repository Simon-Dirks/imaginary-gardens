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
import { BackgroundComponent } from './background/background.component';
import { IndexButtonComponent } from './index-button/index-button.component';
import { IndexOverlayComponent } from './index-overlay/index-overlay.component';
import { IndexService } from '../services/index.service';

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
    BackgroundComponent,
    IndexButtonComponent,
    IndexOverlayComponent,
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
  imagesLoaded = false;
  private destroy$ = new Subject<void>();
  private imagePreloaderService = inject(ImagePreloaderService);
  public indexService = inject(IndexService);
  public soundscapeService = inject(SoundscapeService);

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
