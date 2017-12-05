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

  constructor(private highscoresService: HighscoresHandlerService) { }

  highscores: HighScore[] = [];

  ngOnInit() {

    // Get the top 10 high scores
    this.highscoresService.highscoresReady.subscribe(highscores => {
      this.highscores = highscores;
    });
    this.highscoresService.getTopXHighScore(10);
  }
}
