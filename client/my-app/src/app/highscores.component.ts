import { HighScore } from './models/highscore';
import { HighscoresHandlerService } from './services/highscores-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css'],
  providers: [HighscoresHandlerService]
})
export class HighscoresComponent implements OnInit {

  constructor(private highscoresService: HighscoresHandlerService) {
   }

   highscores: HighScore[] = [];
   score1: HighScore = new HighScore();

  ngOnInit() {

    // subscribe to high scores ready event emitter

    this.highscoresService.highscoresReady.subscribe(highscores => {
        this.highscores = highscores;
    });
    this.highscoresService.getTopXHighScore(10);
  }
}
