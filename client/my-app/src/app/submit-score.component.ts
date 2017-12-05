import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.css']
})
export class SubmitScoreComponent {

  @Output() submitScore: EventEmitter<any> = new EventEmitter<any>();

  name: string;

  // When button clicked, submit score
  SubmitScore() {
    this.submitScore.emit(this.name);
  }

}
