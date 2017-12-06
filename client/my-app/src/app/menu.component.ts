import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AfterViewChecked, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    animations: [
        trigger('myAnimation', [
          state('visible', style({
            transform: 'scale(1)'
          })),
          state('invisible',   style({
            transform: 'scale(0)'
          })),
          transition('invisible => visible', animate('500ms ease-in-out')),
        ])
      ]
})
export class MenuComponent implements AfterViewInit {

    @Output() onStartBtnPressed: EventEmitter<any> = new EventEmitter<any>();

    // Start as visible
    state = 'invisible';

    ngAfterViewInit()
    {
      this.state = 'visible';
    }
    
    StartGame() {

        // When the game starts change to invisible
        this.state = 'invisible';

        // trigger start event
        this.onStartBtnPressed.emit();
    }
}
