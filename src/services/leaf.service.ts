import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private leaves: LeafModel[] = [
    {
      imageUrl: '/img/leaves/15_Da Hyeon Kang.png',
      link: 'https://wikipedia.nl/',
    },
    {
      imageUrl: '/img/leaves/15_Da Hyeon Kang.png',
      link: 'https://wikipedia.nl/',
    },
    {
      imageUrl: '/img/leaves/15_Da Hyeon Kang.png',
      link: 'https://wikipedia.nl/',
    },
    {
      imageUrl: '/img/leaves/15_Da Hyeon Kang.png',
      link: 'https://wikipedia.nl/',
    },
    {
      imageUrl: '/img/leaves/15_Da Hyeon Kang.png',
      link: 'https://wikipedia.nl/',
    },
  ];

  constructor() {}

  getLeaves(): LeafModel[] {
    return this.leaves;
  }

  addLeaf(leaf: LeafModel): void {
    this.leaves.push(leaf);
  }

  removeLeaf(index: number): void {
    if (index >= 0 && index < this.leaves.length) {
      this.leaves.splice(index, 1);
    }
  }
}
