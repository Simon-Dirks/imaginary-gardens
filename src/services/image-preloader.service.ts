import { Injectable } from '@angular/core';
import { LeafService } from './leaf.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  private imagesPreloaded = false;
  private preloadedImages: HTMLImageElement[] = [];

  private _backgroundImagesLoaded = new BehaviorSubject<boolean>(false);
  public backgroundImagesLoaded$ = this._backgroundImagesLoaded.asObservable();

  private backgroundImages = [
    'img/background_day.png',
    'img/background_night.png',
  ];

  constructor(private leafService: LeafService) {}

  preloadLeafImages(): Promise<void> {
    if (this.imagesPreloaded) {
      return Promise.resolve();
    }

    const leaves = this.leafService.getLeaves();
    const leafImageUrls = leaves.map((leaf) => leaf.imageUrl);

    const otherImageUrls = [
      'img/ant.png',
      'img/day-night/day.png',
      'img/day-night/night.png',
      'img/audio/audio-on.png',
      'img/audio/audio-off.png',
      'img/audio/audio-on-night.png',
      'img/audio/audio-off-night.png',
    ];
    const allImageUrls = [...leafImageUrls, ...otherImageUrls];

    console.log('Preloading images:', allImageUrls);

    this.preloadBackgroundImages();

    const imagePromises = allImageUrls.map((url) => this.preloadImage(url));

    return Promise.all(imagePromises)
      .then(() => {
        console.log('All leaf and UI images preloaded successfully');
        this.imagesPreloaded = true;
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
      });
  }

  preloadBackgroundImages(): Promise<void> {
    console.log('Preloading background images:', this.backgroundImages);

    const imagePromises = this.backgroundImages.map((url) =>
      this.preloadImage(url),
    );

    return new Promise<void>((resolve) => {
      Promise.all(imagePromises)
        .then(() => {
          console.log('Background images preloaded successfully');
        })
        .catch((error) => {
          console.error('Error preloading background images:', error);
        })
        .finally(() => {
          console.log('Background images preload completed');
          this._backgroundImagesLoaded.next(true);
          resolve();
        });
    });
  }

  private preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.preloadedImages.push(img);
        resolve();
      };

      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        resolve();
      };

      img.src = url;
    });
  }
}
