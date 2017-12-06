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
 
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('invisible => visible', animate('500ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(0%) scale(0)', offset: 0}),
        style({opacity: 1, transform: 'translateY(0%) scale(1)', offset: 0.1}),
        style({opacity: 0, transform: 'translateY(10%) scale(1)', offset: 1.0})
      ]))),
    ])
  ]
})
export class SplatComponent implements OnChanges, AfterViewInit {

  @Input() splatX;
  @Input() splatY;

  // Init state as invisible
  state = 'invisible';

  // audio
  audio;
  audio2;
  audio3;
  audio4;

  // Only want to check for a click after view init so the animation isnt instant
  detectChanges = false;
  ngAfterViewInit() {
    this.detectChanges = true;

    this.audio = new Audio();
    this.audio.src = '/assets/splat.wav';
    this.audio.load();

    this.audio2 = new Audio();
    this.audio2.src = '/assets/splat2.wav';
    this.audio2.load();

    this.audio3 = new Audio();
    this.audio3.src = '/assets/splat3.wav';
    this.audio3.load();

    this.audio4 = new Audio();
    this.audio4.src = '/assets/splat4.wav';
    this.audio4.load();
  }

  // If the X or Y coords change, the user has clicked, so trigger the animation
  ngOnChanges(changes: SimpleChanges) {
    this.state = 'invisible';
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



    // random number to choose sound
    const rand = Math.floor(Math.random() * 4);

    switch (rand) {
      case 0:
        this.audio.play();
        break;
      case 1:
        this.audio2.play();
        break;
      case 2:
        this.audio3.play();
        break;
      case 3:
        this.audio4.play();
        break;
    }

    this.state = 'visible';
  }
}
