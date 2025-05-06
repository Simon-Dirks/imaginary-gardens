import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  animations: [
    trigger('titleAnimation', [
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      state(
        'hiding',
        style({
          opacity: 0,
          display: 'none',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          display: 'none',
        })
      ),
      transition('visible => hiding', [animate('2000ms ease-out')]),
    ]),
  ],
})
export class TitleComponent implements OnInit {
  @Input() titleState: string = 'visible';

  constructor() {}

  ngOnInit(): void {}
}
