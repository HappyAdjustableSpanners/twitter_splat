import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'life',
    templateUrl: './life.component.html',
    styleUrls: ['./life.component.css'],
    animations: [
        trigger('myAnimation', [
            transition(':enter', [   // :enter is alias to 'void => *'
              style({opacity: 0, transform: 'scale(0)'}),
              animate(500, style({opacity: 1, transform: 'scale(1)'}))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
              animate(500, style({opacity: 0, transform: 'scale(0)'}))
            ])
          ])
        ]
})
export class LifeComponent {
}
