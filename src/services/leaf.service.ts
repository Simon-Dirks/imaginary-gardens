import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private referenceWidth = 1800;
  private referenceHeight = 1020;
  private referenceCenter = { x: 900, y: 510 };

  private leavesOffsets = [
    {
      imageUrl: '/img/leaves/1_dalilah.png',
      link: 'https://thecouch.hethem.nl/rooted-in-thin-air/',
      dx: -343,
      dy: 263,
    },
    {
      imageUrl: '/img/leaves/2_flora.png',
      link: 'https://thecouch.hethem.nl/dragon-fruit/',
      dx: 300,
      dy: 286,
    },
    {
      imageUrl: '/img/leaves/3_Ismael.png',
      link: 'https://thecouch.hethem.nl/the-mirror/',
      dx: 308,
      dy: -238,
    },
    {
      imageUrl: '/img/leaves/4_JanelleLinda.png',
      link: 'https://thecouch.hethem.nl/dead-ends/',
      dx: -69,
      dy: 284,
    },
    {
      imageUrl: '/img/leaves/1_MariaHelena.png',
      link: 'https://thecouch.hethem.nl/five-stars/',
      dx: -526,
      dy: 167,
    },
    {
      imageUrl: '/img/leaves/19_Marie.png',
      link: 'https://thecouch.hethem.nl/from-minerals-to-pixel/',
      dx: 483,
      dy: 266,
    },
    {
      imageUrl: '/img/leaves/7_Mia.png',
      link: 'https://thecouch.hethem.nl/passiflora-my-new-roommate/',
      dx: 303,
      dy: -48,
    },
    {
      imageUrl: '/img/leaves/6_Ning.png',
      link: 'https://thecouch.hethem.nl/what-remains-shall-appear/',
      dx: 126,
      dy: 131,
    },
    {
      imageUrl: '/img/leaves/8_Rafaela.png',
      link: 'https://thecouch.hethem.nl/canibalesmideseo/',
      dx: 488,
      dy: 110,
    },
    {
      imageUrl: '/img/leaves/10_Sarah_Alena.png',
      link: 'https://thecouch.hethem.nl/a-tapestry-of-traces/',
      dx: -291,
      dy: 163,
    },
    {
      imageUrl: '/img/leaves/11_Silver.png',
      link: 'https://thecouch.hethem.nl/kalinixta-mesoskeve/',
      dx: -45,
      dy: 122,
    },
    {
      imageUrl: '/img/leaves/12_Yosuke.png',
      link: 'https://thecouch.hethem.nl/the-algorithmic-garden/',
      dx: -32,
      dy: 2,
    },
    {
      imageUrl: '/img/leaves/13_yuji.png',
      link: 'https://thecouch.hethem.nl/beautiful-rain/',
      dx: -362,
      dy: -123,
    },
    {
      imageUrl: '/img/leaves/15_DaHyeonKang.png',
      link: 'https://thecouch.hethem.nl/silent-plants/',
      dx: -616,
      dy: -5,
    },
    {
      imageUrl: '/img/leaves/16_JaeYoung.png',
      link: 'https://thecouch.hethem.nl/cultivating-the-garden-of-hospitality/',
      dx: 51,
      dy: -193,
    },
    {
      imageUrl: '/img/leaves/17_Sade.png',
      link: 'https://thecouch.hethem.nl/the-bush/',
      dx: -244,
      dy: -19,
    },
    {
      imageUrl: '/img/leaves/18_Mado.png',
      link: 'https://thecouch.hethem.nl/the-green-in-the-city-center/',
      dx: -217,
      dy: -313,
    },
    {
      imageUrl: '/img/leaves/19_Soyeon.png',
      link: 'https://thecouch.hethem.nl/tangerine-kims-memory/',
      dx: -202,
      dy: -147,
    },
  ];

  constructor() {}

  getLeaves(): LeafModel[] {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    return this.leavesOffsets.map((leaf) => ({
      imageUrl: leaf.imageUrl,
      link: leaf.link,
      position: {
        x: center.x + leaf.dx,
        y: center.y + leaf.dy,
      },
    }));
  }

  addLeaf(leaf: {
    imageUrl: string;
    link: string;
    position: { x: number; y: number };
  }): void {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dx = leaf.position.x - center.x;
    const dy = leaf.position.y - center.y;
    this.leavesOffsets.push({
      imageUrl: leaf.imageUrl,
      link: leaf.link,
      dx,
      dy,
    });
  }

  removeLeaf(index: number): void {
    if (index >= 0 && index < this.leavesOffsets.length) {
      this.leavesOffsets.splice(index, 1);
    }
  }

  updateLeafPosition(index: number, position: { x: number; y: number }): void {
    if (index >= 0 && index < this.leavesOffsets.length) {
      const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.leavesOffsets[index].dx = position.x - center.x;
      this.leavesOffsets[index].dy = position.y - center.y;
    }
  }
}
