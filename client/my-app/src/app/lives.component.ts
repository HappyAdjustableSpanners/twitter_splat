import { Component, Input } from '@angular/core';

@Component({
    selector: 'lives',
    templateUrl: './lives.component.html',
    styleUrls: ['./lives.component.css']
})
export class LivesComponent {

    @Input() livesLeft = 3;
}