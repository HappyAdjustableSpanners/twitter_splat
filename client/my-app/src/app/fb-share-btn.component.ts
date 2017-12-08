import { Component, OnInit, Input } from '@angular/core';
import { fbShare } from 'vanilla-sharing';
import { ScoreServiceService } from './score-service.service';

@Component({
  selector: 'fb-share-btn',
  templateUrl: './fb-share-btn.component.html',
  styleUrls: ['./fb-share-btn.component.css']
 })
export class FbShareBtnComponent {

  @Input() score;

  constructor(private scoreService: ScoreServiceService) {}


  Share()
  {
    fbShare({
      url: 'https://www.google.com',
      hashtag: '#splatter',
      quote: 'I scored ' + this.scoreService.GetScore() + ' in Splatter, see how many celeb tweets you can splat!',
      fbAppId: '1652417111489882',
    })
  }
}
