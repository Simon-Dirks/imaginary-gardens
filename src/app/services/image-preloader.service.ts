import { Injectable } from '@angular/core';
import { LeafService } from '../../services/leaf.service';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  private imagesPreloaded = false;
  private preloadedImages: HTMLImageElement[] = [];

  constructor(private leafService: LeafService) {}

  preloadLeafImages(): Promise<void> {
    if (this.imagesPreloaded) {
      return Promise.resolve();
    }

    const leaves = this.leafService.getLeaves();
    const imageUrls = leaves.map((leaf) => leaf.imageUrl);

    const otherImages = [
      'img/background_day.png',
      'img/background_night.png',
      'img/ant.png',
      'img/day-night/day.png',
      'img/day-night/night.png',
      'img/audio/audio-on.png',
      'img/audio/audio-off.png',
    ];
    const allImages = [...imageUrls, ...otherImages];

    console.log('Preloading images:', allImages);

    const imagePromises = allImages.map((url) => this.preloadImage(url));

    return Promise.all(imagePromises)
      .then(() => {
        console.log('All images preloaded successfully');
        this.imagesPreloaded = true;
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
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
