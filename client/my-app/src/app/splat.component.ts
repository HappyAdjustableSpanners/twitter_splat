import { OnChanges, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-splat',
  templateUrl: './splat.component.html',
  styleUrls: ['./splat.component.css'],
  animations: [
    trigger('myAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('invisible', style({
        opacity: 0,
        transform: 'scale(0)'
      })),
      transition('invisible => visible', animate('300ms ease-in')),
    ])
  ]
})
export class SplatComponent implements OnChanges, AfterViewInit {

  @Input() splatX;
  @Input() splatY;

  // Init state as invisible
  state = 'invisible';

  // Only want to check for a click after view init so the animation isnt instant
  detectChanges = false;
  ngAfterViewInit() {
    this.detectChanges = true;
  }

  // If the X or Y coords change, the user has clicked, so trigger the animation
  ngOnChanges(changes: SimpleChanges) {
    if (this.detectChanges) {
      this.Splat();
    }
  }

  // Reset state to invisible after animation is complete
  resetState() {
    this.state = 'invisible';
  }

  // Change state to visible
  Splat() {
    this.state = 'visible';
  }
}
