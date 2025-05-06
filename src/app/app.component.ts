import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LeavesComponent } from './leaves/leaves.component';
import { AudioButtonComponent } from './audio-button/audio-button.component';
import { DayNightButtonComponent } from './day-night-button/day-night-button.component';
import { DayNightService } from './services/day-night.service';
import { SoundscapeService } from './services/soundscape.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    TitleComponent,
    LeavesComponent,
    AudioButtonComponent,
    DayNightButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'imaginary-gardens';
  titleState = 'visible';
  leavesState = 'hidden';
  private dayNightService = inject(DayNightService);
  private soundscapeService = inject(SoundscapeService);

  get isDayMode(): boolean {
    return this.dayNightService.currentMode === 'day';
  }

  constructor() {}

  ngOnInit(): void {}

  onTitleClick() {
    this.titleState = 'hidden';
    this.leavesState = 'visible';
  }
}
