import { Injectable, OnDestroy, inject } from '@angular/core';
import { Howl } from 'howler';
import { Subject, takeUntil } from 'rxjs';
import { AudioService } from './audio.service';
import { DayNightService, DayNightMode } from './day-night.service';

@Injectable({
  providedIn: 'root',
})
export class SoundscapeService implements OnDestroy {
  private daySoundscape: Howl;
  private nightSoundscape: Howl;
  private currentSoundscape: Howl | null = null;
  private destroy$ = new Subject<void>();

  private audioService = inject(AudioService);
  private dayNightService = inject(DayNightService);

  constructor() {
    this.daySoundscape = new Howl({
      src: ['/audio/day-soundscape.mp3'],
      loop: true,
      volume: 0.5,
      preload: true,
      autoplay: false,
    });

    this.nightSoundscape = new Howl({
      src: ['/audio/night-soundscape.mp3'],
      loop: true,
      volume: 0.5,
      preload: true,
      autoplay: false,
    });

    this.updateSoundscape(this.dayNightService.currentMode);

    this.audioService.mode$.pipe(takeUntil(this.destroy$)).subscribe((mode) => {
      if (mode === 'on') {
        this.playSoundscape();
      } else {
        this.pauseSoundscape();
      }
    });

    this.dayNightService.mode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode) => {
        this.updateSoundscape(mode);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.daySoundscape.unload();
    this.nightSoundscape.unload();
  }

  private updateSoundscape(mode: DayNightMode): void {
    if (this.currentSoundscape) {
      console.log(`Stopping current ${mode === 'day' ? 'night' : 'day'} soundscape`);
      this.currentSoundscape.stop();
    }

    this.currentSoundscape =
      mode === 'day' ? this.daySoundscape : this.nightSoundscape;
    
    console.log(`Switched to ${mode} soundscape`);

    if (this.audioService.currentMode === 'on') {
      this.playSoundscape();
    } else {
      console.log('Audio is off, not playing soundscape');
    }
  }

  private playSoundscape(): void {
    if (this.currentSoundscape && !this.currentSoundscape.playing()) {
      const mode = this.dayNightService.currentMode;
      console.log(`Playing ${mode} soundscape`);
      this.currentSoundscape.play();
    }
  }

  private pauseSoundscape(): void {
    if (this.currentSoundscape && this.currentSoundscape.playing()) {
      const mode = this.dayNightService.currentMode;
      console.log(`Pausing ${mode} soundscape`);
      this.currentSoundscape.pause();
    }
  }
}
