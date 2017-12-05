import { SplatComponent } from './splat.component';
import { HighscoresHandlerService } from './services/highscores-handler.service';
import { TwitterAPIService } from './services/twitter-api.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TwitterAPIService, HighscoresHandlerService]
})
export class AppComponent {

  title = 'app';
  tweets: any[] = [];
  numTweets = 300;
  startGame = false;
  gameOver = false;
  score = 0;
  livesLeft = 3;

  gameState = 'Menu';

  componentData = null;

  splatX = 0;
  splatY = 0;
  showSplat = false;
  stylesObj = {};

  // Get tweets
  constructor(private twitterAPIService: TwitterAPIService, private highscoresService: HighscoresHandlerService) { }

  Splat($event)
  {
    console.log("splat at " + $event.clientX + " " + $event.clientY);

    this.splatX = '' + $event.clientX;
    this.splatY = '' + $event.clientY;

    
    this.showSplat = true;
  }
  // when we click start game button
  StartGame() {


    // ngIf trigger to create tweet elements
    // Generate temp tweets

    this.gameState = 'Playing';
    // this.startGame = true;

    if (this.tweets.length === 0) {
      for (let i = 0; i < this.numTweets; i++) {
        let speed = Math.random() * (30 - 6) + 6 + 's';
        this.tweets.push({ text: 'tmp', handle: 'tmp', img: 'tmp', delay: (i * 5) + 's', speed: speed});
      }
      // get handles
      this.twitterAPIService.handlesReady.subscribe(responseHandles => {

        let handles = responseHandles;

        this.twitterAPIService.getTweets(handles);

        // get tweets using handles
        this.twitterAPIService.tweetsReady.subscribe(tweets => {
          tweets = this.shuffle(tweets);
          for (let i = 0; i < tweets.length; i++) {
            this.tweets[i].text = (tweets[i].text.substring(0, 130));
            this.tweets[i].handle = (tweets[i].handle);
            this.tweets[i].img = (tweets[i].img);
            this.tweets[i].state = (tweets[i].state);
          }
          console.log(this.tweets);
        });

      });

      this.twitterAPIService.getHandles();


      // Subscribe to play again event
    }
  }

  SubmitScore(name: string)
  {
    // Post score
    let newScore = { name: name, score: '' + this.score };
    this.highscoresService.PostHighScore(newScore);

    this.highscoresService.scorePosted.subscribe( res => {
     this.gameState = 'GameOver';
    });
  }

  PlayAgain() {
    this.livesLeft = 3;
    this.score = 0;
    this.gameState = 'Menu';
  }

  IncScore() {
    this.score++;
  }

  LoseLife() {
    this.livesLeft--;

    // If lives are 0, game over
    if (this.livesLeft === 0) {
      //this.gameOver = true;
      this.gameState = 'SubmitScore';

    }
  }

  shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

}
