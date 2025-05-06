import { Injectable } from '@angular/core';
import { LeafModel } from '../models/leaf.model';

@Injectable({
  providedIn: 'root',
})
export class LeafService {
  private leaves: LeafModel[] = [
    {
      studentName: 'Emma Johnson',
      title: 'Digital Garden',
      subtitle: 'Exploring virtual ecosystems',
      link: 'https://example.com/emma',
    },
    {
      studentName: 'Liam Smith',
      title: 'Leaf Patterns',
      subtitle: 'Nature-inspired algorithms',
      link: 'https://example.com/liam',
    },
    {
      studentName: 'Olivia Davis',
      title: 'Growth Simulation',
      subtitle: 'Procedural plant generation',
      link: 'https://example.com/olivia',
    },
    {
      studentName: 'Noah Wilson',
      title: 'Garden Harmony',
      subtitle: 'Interactive sound installation',
      link: 'https://example.com/noah',
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
