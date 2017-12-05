import { Http, HttpModule, Headers } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HighScore } from '../models/highscore';


@Injectable()
export class HighscoresHandlerService {

  constructor(private http: Http) { }

  @Output() highscoresReady: EventEmitter<any> = new EventEmitter<any>();
  scorePosted: EventEmitter<any> = new EventEmitter<any>();

  // get all high scores
  getAllHighscores()
  {
     this.http.get(`http://localhost:3000/api/highscores`).toPromise().then(
      response => {
        return response;
    });
  }

  getTopXHighScore(x: number)
  {
    this.http.get(`http://localhost:3000/api/highscores`).toPromise().then(
      response => {
        console.log(response.json());

        // All highscores
        let data = response.json() as HighScore[];

        data.sort(function(a, b) {
          return b.score - a.score;
        });

        // grab the first 10 numbers
        let firstTen = data.slice(0, 10);

        this.highscoresReady.emit(firstTen);
    });
  }

  PostHighScore(score)
  {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/highscores', JSON.stringify(score), {headers: headers}).map(res =>
    {
        res.json();

        this.scorePosted.emit();
    }).subscribe();
  }
}
