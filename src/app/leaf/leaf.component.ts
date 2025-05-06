import { Component, Input, OnInit, inject } from '@angular/core';
import { LeafModel } from '../../models/leaf.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { LeafService } from '../../services/leaf.service';

@Component({
  selector: 'app-leaf',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './leaf.component.html',
  styleUrl: './leaf.component.scss',
})
export class LeafComponent implements OnInit {
  @Input() leaf!: LeafModel;
  @Input() index!: number;

  dragPosition = { x: 0, y: 0 };
  isDragging = false;
  private leafService = inject(LeafService);
  
  get cursorStyle(): { [key: string]: string } {
    return {
      cursor: this.isDragging 
        ? "url('/img/ant-grabbing.png') 29 10, pointer !important"
        : "url('/img/ant-hover.png') 28 10, pointer !important"
    };
  }

  ngOnInit(): void {
    if (this.leaf.position) {
      this.dragPosition = this.leaf.position;
    }
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  onDragEnded(event: CdkDragEnd): void {
    const position = {
      x: this.dragPosition.x + event.distance.x,
      y: this.dragPosition.y + event.distance.y,
    };

    this.dragPosition = position;
    this.leaf.position = position;

    this.leafService.updateLeafPosition(this.index, position);

    setTimeout(() => {
      this.isDragging = false;
    }, 100);
  }

  preventClickIfDragging(event: MouseEvent): void {
    if (this.isDragging) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
