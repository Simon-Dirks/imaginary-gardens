import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
export class LeavesComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Input() movementAmplitude: number = 3; // Controls how much the leaves move (in pixels)
  leaves: LeafModel[] = [];

  private resizeListener = (event: UIEvent) => {
    this.leaves = this.leafService.getLeaves();
  };

  constructor(private leafService: LeafService) {}

  getIntroAnimationDelay(index: number): number {
    return index * 0.05;
  }

  ngOnInit(): void {
    this.leaves = this.leafService.getLeaves();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }
}
