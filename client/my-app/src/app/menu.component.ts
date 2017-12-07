import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
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

    constructor(private cdRef: ChangeDetectorRef) {}

    @Output() onStartBtnPressed: EventEmitter<any> = new EventEmitter<any>();

    // Start as visible
    state = 'invisible';
    imageUrl = 'assets/btn-start-up.png';

    ngAfterViewInit() {
      this.state = 'visible';
      this.cdRef.detectChanges();
    }

    StartGame() {

        this.imageUrl = 'assets/btn-start-down.png';

        setTimeout(() => {
        // When the game starts change to invisible
        this.state = 'invisible';

        // trigger start event
        this.onStartBtnPressed.emit();
      }, 50);
    }
}
