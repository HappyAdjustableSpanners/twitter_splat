import { Injectable } from '@angular/core';

@Injectable()
export class ScoreServiceService {

  score: number;

  constructor() { }

  GetScore()
  {
    return this.score;
  }

  SetScore(score)
  {
    this.score = score;
  }
}
