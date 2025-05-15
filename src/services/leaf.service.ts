import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private referenceWidth = 1800;
  private referenceHeight = 1020;

  public leavesData: LeafModel[] = [
    {
      imageUrl: '/img/leaves/15_DaHyeonKang.png',
      link: 'https://thecouch.hethem.nl/silent-plants/',
      title: 'Silent Plants',
      authorName: 'Da Hyeon Kang',
      dx: -616,
      dy: -5,
    },
    {
      imageUrl: '/img/leaves/1_dalilah.png',
      link: 'https://thecouch.hethem.nl/rooted-in-thin-air/',
      title: 'Rooted in thin air',
      authorName: 'Dalila Fermezza',
      dx: -343,
      dy: 263,
    },
    {
      imageUrl: '/img/leaves/2_flora.png',
      link: 'https://thecouch.hethem.nl/dragon-fruit/',
      title: 'Dragon Fruit',
      authorName: 'Flora Moneka Goulidei',
      dx: 300,
      dy: 286,
    },
    {
      imageUrl: '/img/leaves/3_Ismael.png',
      link: 'https://thecouch.hethem.nl/the-mirror/',
      title: 'The Mirror',
      authorName: 'Ismael Abou El Mouroua',
      dx: 308,
      dy: -238,
    },
    {
      imageUrl: '/img/leaves/16_JaeYoung.png',
      link: 'https://thecouch.hethem.nl/cultivating-the-garden-of-hospitality/',
      title: 'Cultivating the Garden of Hospitality',
      authorName: 'Jaeyoung Lee',
      dx: 51,
      dy: -193,
    },
    {
      imageUrl: '/img/leaves/4_JanelleLinda.png',
      link: 'https://thecouch.hethem.nl/dead-ends/',
      title: 'Dead Ends',
      authorName: 'Janelle Cruz<br/>Linda Učelniece',
      dx: -69,
      dy: 284,
    },
    {
      imageUrl: '/img/leaves/18_Mado.png',
      link: 'https://thecouch.hethem.nl/the-green-in-the-city-center/',
      title: 'The green in the city center',
      authorName: 'Mado Nullans',
      dx: -217,
      dy: -313,
    },
    {
      imageUrl: '/img/leaves/1_MariaHelena.png',
      link: 'https://thecouch.hethem.nl/five-stars/',
      title: 'Five stars',
      authorName: 'María Merino Arzoz<br/>Helena Escudero Leiva',
      dx: -526,
      dy: 167,
    },
    {
      imageUrl: '/img/leaves/19_Marie.png',
      link: 'https://thecouch.hethem.nl/from-minerals-to-pixel/',
      title: 'from minerals to pixel',
      authorName: 'Marie Garreyn',
      dx: 483,
      dy: 266,
    },
    {
      imageUrl: '/img/leaves/7_Mia.png',
      link: 'https://thecouch.hethem.nl/passiflora-my-new-roommate/',
      title: 'Passiflora',
      authorName: 'Mia Domenech Puras',
      dx: 303,
      dy: -48,
    },
    {
      imageUrl: '/img/leaves/6_Ning.png',
      link: 'https://thecouch.hethem.nl/what-remains-shall-appear/',
      title: 'What remains shall appear',
      authorName: 'Ning-Ju Hsu',
      dx: 126,
      dy: 131,
    },
    {
      imageUrl: '/img/leaves/8_Rafaela.png',
      link: 'https://thecouch.hethem.nl/canibalesmideseo/',
      title: 'Gardens of desires',
      authorName: 'Rafaela Aguilar Bostock',
      dx: 488,
      dy: 110,
    },
    {
      imageUrl: '/img/leaves/17_Sade.png',
      link: 'https://thecouch.hethem.nl/the-bush/',
      title: 'The Bush',
      authorName: 'Sade Ekwedike',
      dx: -244,
      dy: -19,
    },
    {
      imageUrl: '/img/leaves/10_Sarah_Alena.png',
      link: 'https://thecouch.hethem.nl/a-tapestry-of-traces/',
      title: 'A Tapestry of Traces',
      authorName: 'Sarah Maurer<br/>Alena Halmes',
      dx: -291,
      dy: 163,
    },
    {
      imageUrl: '/img/leaves/11_Silver.png',
      link: 'https://thecouch.hethem.nl/kalinixta-mesoskeve/',
      title: 'kalinixta mesoskeve',
      authorName: 'Silver Giannakidi',
      dx: -45,
      dy: 122,
    },
    {
      imageUrl: '/img/leaves/19_Soyeon.png',
      link: 'https://thecouch.hethem.nl/tangerine-kims-memory/',
      title: "Tangerine Kim's memory",
      authorName: 'Soyeon Kim',
      dx: -202,
      dy: -147,
    },
    {
      imageUrl: '/img/leaves/12_Yosuke.png',
      link: 'https://thecouch.hethem.nl/the-algorithmic-garden/',
      title: 'The Algorithmic Garden',
      authorName: 'Yosuke Matsushita',
      dx: -32,
      dy: 2,
    },
    {
      imageUrl: '/img/leaves/13_yuji.png',
      link: 'https://thecouch.hethem.nl/beautiful-rain/',
      title: 'Beautiful Rain',
      authorName: 'Yuji Inoue',
      dx: -362,
      dy: -123,
    },
  ];

  public verticalSpreadFactor = 3; // Determines how far the leaves spread out vertically while you make the screen width smaller, to prevent leaf overlap on smaller screens

  constructor() {}

  getLeaves(): LeafModel[] {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (viewportWidth < 768) {
      // Mobile: leaves are stacked vertically, one leaf per "row"
      const topPadding = 50;
      const leafSpacing = 200;
      return this.leavesData.map((leaf, i) => ({
        imageUrl: leaf.imageUrl,
        link: leaf.link,
        title: leaf.title,
        authorName: leaf.authorName,
        position: {
          x: viewportWidth / 2 - 150,
          y: topPadding + leafSpacing * i,
        },
        dx: 0,
        dy: 0,
      }));
    } else {
      // Original layout for larger screens, leaves spread out vertically as screen width gets smaller
      const center = { x: viewportWidth / 2, y: viewportHeight / 2 };
      const scaleX = viewportWidth / this.referenceWidth;
      const scaleY = viewportHeight / this.referenceHeight;
      const widthRatio = Math.min(1, viewportWidth / this.referenceWidth);
      const spreadMultiplier =
        1 + (1 - widthRatio) * (this.verticalSpreadFactor - 1);
      const minDy = Math.min(...this.leavesData.map((l) => l.dy));
      return this.leavesData.map((leaf) => {
        let extraSpread = 0;
        if (leaf.dy > minDy) {
          extraSpread = (leaf.dy - minDy) * (spreadMultiplier - 1);
        }
        return {
          imageUrl: leaf.imageUrl,
          link: leaf.link,
          title: leaf.title,
          authorName: leaf.authorName,
          position: {
            x: center.x + leaf.dx * scaleX - 90,
            y: center.y + (leaf.dy + extraSpread) * scaleY - 100,
          },
          dx: leaf.dx,
          dy: leaf.dy,
        };
      });
    }
  }

  addLeaf(leaf: {
    imageUrl: string;
    link: string;
    title: string;
    authorName: string;
    position: { x: number; y: number };
  }): void {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dx = leaf.position.x - center.x;
    const dy = leaf.position.y - center.y;
    this.leavesData.push({
      imageUrl: leaf.imageUrl,
      link: leaf.link,
      title: leaf.title,
      authorName: leaf.authorName,
      dx,
      dy,
    });
  }

  removeLeaf(index: number): void {
    if (index >= 0 && index < this.leavesData.length) {
      this.leavesData.splice(index, 1);
    }
  }

  updateLeafPosition(index: number, position: { x: number; y: number }): void {
    if (index >= 0 && index < this.leavesData.length) {
      const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.leavesData[index].dx = position.x - center.x;
      this.leavesData[index].dy = position.y - center.y;
    }
  }
}
