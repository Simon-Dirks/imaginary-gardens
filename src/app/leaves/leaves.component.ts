import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafComponent } from '../leaf/leaf.component';
import { LeafService } from '../../services/leaf.service';
import { LeafModel } from '../../models/leaf.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, LeafComponent],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss',
  animations: [
    trigger('leavesAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden => visible', [animate('1000ms ease-in')]),
    ]),
  ],
})
export class LeavesComponent implements OnInit {
  @Input() leavesState: string = 'hidden';
  leaves: LeafModel[] = [];

  constructor(private leafService: LeafService) {}

  ngOnInit(): void {
    this.leaves = this.leafService.getLeaves();
  }
}
