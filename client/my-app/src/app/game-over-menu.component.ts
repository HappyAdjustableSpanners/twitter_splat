import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'game-over-menu',
  templateUrl: './game-over-menu.component.html',
  styleUrls: ['./game-over-menu.component.css']
})
export class GameOverMenuComponent implements OnInit {

  @Output() playAgainBtnPressed: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit()
  {
    // subscribe to high scores
  }

  PlayAgain() {
     // Trigger play again event
     this.playAgainBtnPressed.emit();
  }
}
