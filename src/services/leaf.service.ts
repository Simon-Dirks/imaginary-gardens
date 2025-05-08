import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private leaves: LeafModel[] = [
    {
      imageUrl: '/img/leaves/1_dalilah.png',
      link: 'https://thecouch.hethem.nl/rooted-in-thin-air/',
      position: { x: 357, y: 663 },
    },
    {
      imageUrl: '/img/leaves/2_flora.png',
      link: 'https://thecouch.hethem.nl/dragon-fruit/',
      position: { x: 1000, y: 686 },
    },
    {
      imageUrl: '/img/leaves/3_Ismael.png',
      link: 'https://thecouch.hethem.nl/the-mirror/',
      position: { x: 1008, y: 162 },
    },
    {
      imageUrl: '/img/leaves/4_JanelleLinda.png',
      link: 'https://thecouch.hethem.nl/dead-ends/',
      position: { x: 631, y: 684 },
    },
    {
      imageUrl: '/img/leaves/1_MariaHelena.png',
      link: 'https://thecouch.hethem.nl/five-stars/',
      position: { x: 174, y: 567 },
    },
    {
      imageUrl: '/img/leaves/19_Marie.png',
      link: 'https://thecouch.hethem.nl/from-minerals-to-pixel/',
      position: { x: 1183, y: 666 },
    },
    {
      imageUrl: '/img/leaves/7_Mia.png',
      link: 'https://thecouch.hethem.nl/passiflora-my-new-roommate/',
      position: { x: 1003, y: 352 },
    },
    {
      imageUrl: '/img/leaves/6_Ning.png',
      link: 'https://thecouch.hethem.nl/what-remains-shall-appear/',
      position: { x: 826, y: 531 },
    },
    {
      imageUrl: '/img/leaves/8_Rafaela.png',
      link: 'https://thecouch.hethem.nl/canibalesmideseo/',
      position: { x: 1188, y: 510 },
    },
    {
      imageUrl: '/img/leaves/10_Sarah_Alena.png',
      link: 'https://thecouch.hethem.nl/a-tapestry-of-traces/',
      position: { x: 409, y: 563 },
    },
    {
      imageUrl: '/img/leaves/11_Silver.png',
      link: 'https://thecouch.hethem.nl/kalinixta-mesoskeve/',
      position: { x: 655, y: 522 },
    },
    {
      imageUrl: '/img/leaves/12_Yosuke.png',
      link: 'https://thecouch.hethem.nl/the-algorithmic-garden/',
      position: { x: 668, y: 402 },
    },
    {
      imageUrl: '/img/leaves/13_yuji.png',
      link: 'https://thecouch.hethem.nl/beautiful-rain/',
      position: { x: 338, y: 277 },
    },
    {
      imageUrl: '/img/leaves/15_DaHyeonKang.png',
      link: 'https://thecouch.hethem.nl/silent-plants/',
      position: { x: 84, y: 395 },
    },
    {
      imageUrl: '/img/leaves/16_JaeYoung.png',
      link: 'https://thecouch.hethem.nl/cultivating-the-garden-of-hospitality/',
      position: { x: 751, y: 207 },
    },
    {
      imageUrl: '/img/leaves/17_Sade.png',
      link: 'https://thecouch.hethem.nl/the-bush/',
      position: { x: 456, y: 381 },
    },
    {
      imageUrl: '/img/leaves/18_Mado.png',
      link: 'https://thecouch.hethem.nl/the-green-in-the-city-center/',
      position: { x: 483, y: 87 },
    },
    {
      imageUrl: '/img/leaves/19_Soyeon.png',
      link: 'https://thecouch.hethem.nl/tangerine-kims-memory/',
      position: { x: 498, y: 253 },
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
