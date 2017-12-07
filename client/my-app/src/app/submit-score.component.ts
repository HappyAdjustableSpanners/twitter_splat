import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.css']
})
export class SubmitScoreComponent {

  @Output() submitScore: EventEmitter<any> = new EventEmitter<any>();
  @Input() score;

  name: string;

  // When button clicked, submit score
  SubmitScore() {
    if(this.name !== undefined)
    {
      this.submitScore.emit(this.name);
    }
  }

}
