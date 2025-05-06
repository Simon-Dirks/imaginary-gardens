import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private leaves: LeafModel[] = [
    {
      imageUrl: '/img/leaves/1_DalilaFermezza.png',
      link: 'https://thecouch.hethem.nl/rooted-in-thin-air/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/2_flora.png',
      link: 'https://thecouch.hethem.nl/dragon-fruit/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/3_ismael.png',
      link: 'https://thecouch.hethem.nl/the-mirror/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/4_Janelle_Linda.png',
      link: 'https://thecouch.hethem.nl/dead-ends/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/5_Maria_Helena.png',
      link: 'https://thecouch.hethem.nl/five-stars/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/6_Marie Garreyn.png',
      link: 'https://thecouch.hethem.nl/from-minerals-to-pixel/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/7_Mia Domenech Puras.png',
      link: 'https://thecouch.hethem.nl/passiflora-my-new-roommate/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/8_Ning-Ju Hsu.png',
      link: 'https://thecouch.hethem.nl/what-remains-shall-appear/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/9_Rafaela Aguilar Bostock.png',
      link: 'https://thecouch.hethem.nl/canibalesmideseo/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/10_Sarah_Alena.png',
      link: 'https://thecouch.hethem.nl/a-tapestry-of-traces/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/11_Silver.png',
      link: 'https://thecouch.hethem.nl/kalinixta-mesoskeve/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/12_Yosuke.png',
      link: 'https://thecouch.hethem.nl/the-algorithmic-garden/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/13_Yuji.png',
      link: 'https://thecouch.hethem.nl/beautiful-rain/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/15_Da Hyeon Kang.png',
      link: 'https://thecouch.hethem.nl/silent-plants/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/16_JaeYoung.png',
      link: 'https://thecouch.hethem.nl/cultivating-the-garden-of-hospitality/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/17_SadeEkwedike.png',
      link: 'https://thecouch.hethem.nl/the-bush/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/18_MadoNullans.png',
      link: 'https://thecouch.hethem.nl/the-green-in-the-city-center/',
      position: this.generateRandomPosition(),
    },
    {
      imageUrl: '/img/leaves/19_SoyeonKim.png',
      link: 'https://thecouch.hethem.nl/tangerine-kims-memory/',
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
