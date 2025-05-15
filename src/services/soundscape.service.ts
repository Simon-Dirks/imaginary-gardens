import { Injectable, OnDestroy, inject } from '@angular/core';
import { Howl } from 'howler';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
  private _dayAudioReady = new BehaviorSubject<boolean>(false);
  private _nightAudioReady = new BehaviorSubject<boolean>(false);
  private _audioReady = new BehaviorSubject<boolean>(false);

  private daySeekPosition: number = 0;
  private nightSeekPosition: number = 0;

  public dayAudioReady$ = this._dayAudioReady.asObservable();
  public nightAudioReady$ = this._nightAudioReady.asObservable();
  public audioReady$ = this._audioReady.asObservable();

  private audioService = inject(AudioService);
  private dayNightService = inject(DayNightService);

  constructor() {
    this.daySoundscape = new Howl({
      src: ['/audio/day-soundscape.mp3'],
      loop: true,
      volume: 1,
      preload: true,
      autoplay: false,
      onload: () => {
        console.log('Day soundscape loaded');
        this._dayAudioReady.next(true);
        this.checkAudioReady();
      },
      onloaderror: (id, error) =>
        console.error('Error loading day soundscape:', error),
    });

    this.nightSoundscape = new Howl({
      src: ['/audio/night-soundscape.mp3'],
      loop: true,
      volume: 1,
      preload: true,
      autoplay: false,
      onload: () => {
        console.log('Night soundscape loaded');
        this._nightAudioReady.next(true);
        this.checkAudioReady();
      },
      onloaderror: (id, error) =>
        console.error('Error loading night soundscape:', error),
    });

    console.log('Preloading audio files...');

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
    this._dayAudioReady.complete();
    this._nightAudioReady.complete();
    this._audioReady.complete();
  }

  private checkAudioReady(): void {
    if (
      this.daySoundscape.state() === 'loaded' &&
      this.nightSoundscape.state() === 'loaded'
    ) {
      console.log('All audio files loaded successfully');
      this._audioReady.next(true);
    }
  }

  public get dayAudioReady(): boolean {
    return this._dayAudioReady.value;
  }

  public get nightAudioReady(): boolean {
    return this._nightAudioReady.value;
  }

  public get audioReady(): boolean {
    return this._audioReady.value;
  }

  public get currentModeAudioReady(): boolean {
    const mode = this.dayNightService.currentMode;
    return mode === 'day' ? this.dayAudioReady : this.nightAudioReady;
  }

  private updateSoundscape(mode: DayNightMode): void {
    const previousMode = mode === 'day' ? 'night' : 'day';
    const previousSoundscape =
      mode === 'day' ? this.nightSoundscape : this.daySoundscape;

    if (this.currentSoundscape && this.currentSoundscape.playing()) {
      const currentSeek = this.currentSoundscape.seek() as number;
      console.log(`Saving ${previousMode} position: ${currentSeek}s`);

      if (previousMode === 'day') {
        this.daySeekPosition = currentSeek;
      } else {
        this.nightSeekPosition = currentSeek;
      }

      console.log(`Stopping current ${previousMode} soundscape`);
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
      const seekPosition =
        mode === 'day' ? this.daySeekPosition : this.nightSeekPosition;

      console.log(`Playing ${mode} soundscape`);
      this.currentSoundscape.play();

      if (seekPosition > 0) {
        console.log(`Resuming ${mode} soundscape from ${seekPosition}s`);
        this.currentSoundscape.seek(seekPosition);
      }
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
