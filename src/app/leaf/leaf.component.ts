import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { LeafModel } from '../../models/leaf.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { LeafService } from '../../services/leaf.service';
import { interval, Subscription } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-leaf',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './leaf.component.html',
  styleUrls: ['./leaf.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('6s {{delay}}s ease-out', style({ opacity: 1 })),
        ],
        { params: { delay: 0 } }
      ),
    ]),
  ],
})
export class LeafComponent implements OnInit, OnDestroy {
  @Input() leaf!: LeafModel;
  @Input() index!: number;
  @Input() animationDelay: number = 0;

  dragPosition = { x: 0, y: 0 };
  isDragging = false;
  verticalOffset = 0;
  horizontalOffset = 0;
  private leafService = inject(LeafService);
  private sanitizer = inject(DomSanitizer);
  private animationSubscription?: Subscription;

  get combinedStyle(): SafeStyle {
    const cursorStyle = "url('/img/ant-hover.png') 28 10, pointer !important";

    return this.sanitizer.bypassSecurityTrustStyle(
      `cursor: ${cursorStyle}; top: ${this.verticalOffset}px; left: ${this.horizontalOffset}px;`
    );
  }

  ngOnInit(): void {
    if (this.leaf.position) {
      this.dragPosition = this.leaf.position;
    }
    this.startRandomMovement();
  }

  ngOnDestroy(): void {
    this.stopRandomMovement();
  }

  private startRandomMovement(): void {
    this.updateRandomOffsets();

    this.animationSubscription = interval(1000).subscribe(() => {
      if (!this.isDragging) {
        this.updateRandomOffsets();
      }
    });
  }

  private updateRandomOffsets(): void {
    this.verticalOffset = Math.floor(Math.random() * 41) - 20; // Range from -20 to +20
    this.horizontalOffset = Math.floor(Math.random() * 41) - 20; // Range from -20 to +20
  }

  private stopRandomMovement(): void {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
      this.animationSubscription = undefined;
    }
  }

  onDragStarted(): void {
    this.isDragging = true;
    this.verticalOffset = 0;
    this.horizontalOffset = 0;
  }

  onDragEnded(event: CdkDragEnd): void {
    const position = {
      x: this.dragPosition.x + event.distance.x,
      y: this.dragPosition.y + event.distance.y,
    };

    this.dragPosition = position;
    this.leaf.position = position;

    this.verticalOffset = 0;
    this.horizontalOffset = 0;

    this.leafService.updateLeafPosition(this.index, position);

    setTimeout(() => {
      this.isDragging = false;
      this.updateRandomOffsets();
    }, 100);
  }

  preventClickIfDragging(event: MouseEvent): void {
    if (this.isDragging) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
