import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.css']
})
export class SubmitScoreComponent implements OnInit {

  constructor() { }

  @Output() submitScore: EventEmitter<any> = new EventEmitter<any>();
  
  name: string;
  ngOnInit() {
  }

  SubmitScore()
  {
  
    this.submitScore.emit(this.name);

  }

}
