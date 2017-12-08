import { Component, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
    selector: 'score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css'],
    animations: [
        trigger('scoreUp', [
          state('inactive', style({
            transform: 'scale(1)'
          })),
          state('active',   style({
            transform: 'scale(1.5)'
          })),
          transition('inactive <=> active', animate('300ms ease-in'))
        ])
      ]
})
export class ScoreComponent implements OnChanges {

    @Input() score;

    constructor(private cdRef: ChangeDetectorRef) {}

    // Init state as inactive
    state = 'inactive';

    AnimationDone() {
        // when the animation is complete, go back to being inactive
        this.state = 'inactive';
    }

    ngOnChanges(changes: SimpleChanges) {

        // Whenever the score changes, go back to being active
        this.state = 'active';

        this.cdRef.detectChanges();
    }

}
