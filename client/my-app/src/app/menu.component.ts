import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    animations: [
        trigger('myAnimation', [
          state('visible', style({
            opacity: 1,
            transform: 'scale(1)'
          })),
          state('invisible',   style({
            opacity: 0,
            transform: 'scale(1.1)'
          })),
          transition('visible => invisible', animate('100ms ease-in')),
        ])
      ]
})
export class MenuComponent {

    @Output() onStartBtnPressed: EventEmitter<any> = new EventEmitter<any>();

    // Start as visible
    state = 'visible';

    StartGame() {

        // When the game starts change to invisible
        this.state = 'invisible';

        // trigger start event
        this.onStartBtnPressed.emit();
    }
}
