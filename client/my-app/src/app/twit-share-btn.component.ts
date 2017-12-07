import { Component, OnInit } from '@angular/core';
import { tw } from 'vanilla-sharing';
import { ScoreServiceService } from './score-service.service';

@Component({
  selector: 'twit-share-btn',
  templateUrl: './twit-share-btn.component.html',
  styleUrls: ['./twit-share-btn.component.css']
})
export class TwitShareBtnComponent {

  constructor(private scoreService: ScoreServiceService) {}

  Share()
  {
    tw({
      url: 'https://www.google.com',
      title: 'I scored ' + this.scoreService.GetScore() + ' in Splatter. Try it yourself!',
    })
  }
}

