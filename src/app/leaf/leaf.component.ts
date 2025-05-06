import { Component, Input } from '@angular/core';
import { LeafModel } from '../../models/leaf.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaf.component.html',
  styleUrl: './leaf.component.scss'
})
export class LeafComponent {
  @Input() leaf!: LeafModel;
}
