import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css'],
  animations: [
    trigger('hand1', [
      state('invisible', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible <=> invisible', animate('150ms ease-in'))
    ]),
    trigger('hand2', [
      state('invisible', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible <=> invisible', animate('150ms ease-in'))
    ])
  ]
})
export class CursorComponent {

  constructor() { }

  hand1State = 'visible';
  hand2State = 'invisible';
  @Input() X;
  @Input() Y;

  Throw()
  {
    // Trigger animation which has 3 keyframes, then goes back to first state on animation end
    this.hand1State = 'invisible';
    this.hand2State = 'visible';
  }

  AnimationEnd()
  {
    this.hand1State = 'visible';
    this.hand2State = 'invisible';
  }
}
