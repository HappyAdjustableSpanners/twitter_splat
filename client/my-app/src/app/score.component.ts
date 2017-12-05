import { Component, Input, SimpleChanges } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
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
export class ScoreComponent implements OnChanges{

    @Input() score;

    state = 'inactive';

    AnimationDone()
    {
        this.state = 'inactive';
        console.log('reset state');
    }

    ngOnChanges(changes: SimpleChanges) {
        this.state = 'active';
    }

}
