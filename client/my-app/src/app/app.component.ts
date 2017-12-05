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

  // Tweets
  tweets: any[] = [];
  numTweets = 300;

  // Gameplay
  score = 0;
  livesLeft = 3;
  gameState = 'Menu';

  // Splat
  splatX = '0';
  splatY = '0';
  showSplat = false;

  // Get tweets
  constructor(private twitterAPIService: TwitterAPIService, private highscoresService: HighscoresHandlerService) { }

  Splat($event) {
    this.splatX = '' + $event.clientX;
    this.splatY = '' + $event.clientY;
    this.showSplat = true;
  }

  // when we click start game button
  StartGame() {

    // Set state to playing
    this.gameState = 'Playing';

    // If we haven't already pulled any tweets (from the twitter API)
    if (this.tweets.length === 0) {
      this.GetTweets();
    }
  }

  GetTweets() {
    for (let i = 0; i < this.numTweets; i++) {
      const speed = Math.random() * (30 - 6) + 6 + 's';
      this.tweets.push({ text: 'tmp', handle: 'tmp', img: 'tmp', delay: (i * 5) + 's', speed: speed });
    }
    // get handles
    this.twitterAPIService.handlesReady.subscribe(handles => {

      // Get tweets by handles
      this.twitterAPIService.getTweets(handles);
      this.twitterAPIService.tweetsReady.subscribe(tweets => {

        // Shuffle the received tweets so we get a mixture of authors
        tweets = this.shuffle(tweets);

        // Init the tweet's text, handle, img and state
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
  }


  SubmitScore(name: string) {
    // Post score
    const newScore = { name: name, score: '' + this.score };
    this.highscoresService.PostHighScore(newScore);

    // Listen for when the high scores service has posted the score, before we change state to game over
    this.highscoresService.scorePosted.subscribe(res => {
      this.gameState = 'GameOver';
    });
  }

  PlayAgain() {

    // Reset stats and change state back to menu
    this.livesLeft = 3;
    this.score = 0;
    this.gameState = 'Menu';
  }


  IncScore() {
    // Increment our score by 1
    this.score++;
  }

  LoseLife() {

    // Decrement our remaining lives by 1
    this.livesLeft--;

    // If lives are 0, game over
    if (this.livesLeft === 0) {

      // Change state to our submit score menu
      this.gameState = 'SubmitScore';
    }
  }

  // Shuffle array
  shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
}
