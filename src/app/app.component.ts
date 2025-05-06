import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeafComponent } from "./leaf/leaf.component";
import { LeafService } from "../services/leaf.service";
import { LeafModel } from "../models/leaf.model";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeafComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'imaginary-gardens';
  leaves: LeafModel[] = [];

  constructor(private leafService: LeafService) {}

  ngOnInit(): void {
    this.leaves = this.leafService.getLeaves();
  }
}
