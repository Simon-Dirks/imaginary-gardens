import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayNightService } from '../../services/day-night.service';
import { LeafService } from '../../services/leaf.service';
import { IndexService } from '../../services/index.service';

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

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
