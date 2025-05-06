import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private leaves: LeafModel[] = [
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim_1.svg',
      link: 'https://wikipedia.nl/',
      position: this.generateRandomPosition(),
    },
  ];

  constructor() {}

  getLeaves(): LeafModel[] {
    return this.leaves;
  }

  addLeaf(leaf: LeafModel): void {
    if (!leaf.position) {
      leaf.position = this.generateRandomPosition();
    }
    this.leaves.push(leaf);
  }

  removeLeaf(index: number): void {
    if (index >= 0 && index < this.leaves.length) {
      this.leaves.splice(index, 1);
    }
  }

  updateLeafPosition(index: number, position: { x: number; y: number }): void {
    if (index >= 0 && index < this.leaves.length) {
      this.leaves[index].position = position;
    }
  }

  private generateRandomPosition(): { x: number; y: number } {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const minX = viewportWidth * 0.1;
    const maxX = viewportWidth * 0.9;
    const minY = viewportHeight * 0.1;
    const maxY = viewportHeight * 0.9;

    return {
      x: Math.floor(minX + Math.random() * (maxX - minX)),
      y: Math.floor(minY + Math.random() * (maxY - minY)),
    };
  }
}
