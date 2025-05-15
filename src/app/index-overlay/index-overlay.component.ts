import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayNightService } from '../../services/day-night.service';
import { LeafService } from '../../services/leaf.service';
import { IndexService } from '../../services/index.service';
import { LeafModel } from '../../models/leaf.model';

@Component({
  selector: 'app-index-overlay',
  imports: [CommonModule],
  templateUrl: './index-overlay.component.html',
  styleUrl: './index-overlay.component.scss',
  standalone: true,
})
export class IndexOverlayComponent implements OnInit, OnDestroy {
  public leafService = inject(LeafService);
  public dayNightService = inject(DayNightService);
  public indexService = inject(IndexService);

  entries: LeafModel[] = [];

  ngOnInit(): void {
    this.entries = [...this.leafService.leavesData];
    this.entries.unshift({
      title: "Editor's Note",
      authorName: 'Maia Kenney',
      link: 'https://thecouch.hethem.nl/imaginary-gardens/',
      imageUrl: '',
      dx: 0,
      dy: 0,
    });
  }

  ngOnDestroy(): void {}
}
