import { Injectable } from '@angular/core';
import { LeafService } from './leaf.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  private imagesPreloaded = false;
  private preloadedImages: HTMLImageElement[] = [];

  // Track background images loading status
  private _backgroundImagesLoaded = new BehaviorSubject<boolean>(false);
  public backgroundImagesLoaded$ = this._backgroundImagesLoaded.asObservable();

  // Background image paths
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
    const imageUrls = leaves.map((leaf) => leaf.imageUrl);

    const otherImages = [
      'img/ant.png',
      'img/day-night/day.png',
      'img/day-night/night.png',
      'img/audio/audio-on.png',
      'img/audio/audio-off.png',
      'img/audio/audio-on-night.png',
      'img/audio/audio-off-night.png',
    ];
    const allImages = [...imageUrls, ...otherImages];

    console.log('Preloading images:', allImages);

    // Preload background images separately
    this.preloadBackgroundImages();

    const imagePromises = allImages.map((url) => this.preloadImage(url));

    return Promise.all(imagePromises)
      .then(() => {
        console.log('All leaf and UI images preloaded successfully');
        this.imagesPreloaded = true;
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
      });
  }

  /**
   * Preload background images and update the backgroundImagesLoaded$ observable
   */
  preloadBackgroundImages(): Promise<void> {
    console.log('Preloading background images:', this.backgroundImages);

    const imagePromises = this.backgroundImages.map((url) =>
      this.preloadImage(url)
    );

    return new Promise<void>((resolve) => {
      Promise.all(imagePromises)
        .then(() => {
          console.log('Background images preloaded successfully');
          this._backgroundImagesLoaded.next(true);
          resolve();
        })
        .catch((error) => {
          console.error('Error preloading background images:', error);
          // Still set to true to not block the UI
          this._backgroundImagesLoaded.next(true);
          resolve();
        });
    });
  }

  private preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.preloadedImages.push(img); // Keep a reference to prevent garbage collection
        resolve();
      };

      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        resolve(); // Resolve anyway to not block other images
      };

      img.src = url;
    });
  }
}
