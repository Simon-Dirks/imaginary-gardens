import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LeavesComponent } from './leaves/leaves.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TitleComponent, LeavesComponent],
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
