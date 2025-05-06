import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafComponent } from '../leaf/leaf.component';
import { LeafService } from '../../services/leaf.service';
import { LeafModel } from '../../models/leaf.model';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, LeafComponent],
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() movementAmplitude: number = 3; // Controls how much the leaves move (in pixels)
  leaves: LeafModel[] = [];

  constructor(private leafService: LeafService) {}

  getIntroAnimationDelay(index: number): number {
    return index * 0.2;
  }

  ngOnInit(): void {
    this.leaves = this.leafService.getLeaves();
  }
}
