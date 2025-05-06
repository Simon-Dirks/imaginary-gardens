import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LeavesComponent } from './leaves/leaves.component';
import { AudioButtonComponent } from "./audio-button/audio-button.component";
import { DayNightButtonComponent } from "./day-night-button/day-night-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TitleComponent, LeavesComponent, AudioButtonComponent, DayNightButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'imaginary-gardens';
  titleState = 'visible';
  leavesState = 'hidden';

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.titleState = 'hidden';

      setTimeout(() => {
        this.leavesState = 'visible';
      }, 1000);
    }, 1000);
  }
}
