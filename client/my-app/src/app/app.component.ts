import { CursorComponent } from './cursor.component';
import { SplatComponent } from './splat.component';
import { HighscoresHandlerService } from './services/highscores-handler.service';
import { TwitterAPIService } from './services/twitter-api.service';
import { Component, ViewChild } from '@angular/core';
import { ScoreServiceService } from './score-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TwitterAPIService, HighscoresHandlerService]
})
export class AppComponent {

  // Tweets
  tweets: any[] = [];
  tweetsDone = 0;
  tweetsRolling = true;

  // Setup
  tweetsPerHandle = 30;
  numHandles = 6; // at the moment, needs the match how many handles are in the db

  // Gameplay
  score = 0;
  livesLeft = 3;
  gameState = 'Menu';

  // Splat
  splatX = '0';
  splatY = '0';

  // mouse
  mouseX;
  mouseY;


  @ViewChild('cursor')

  private cursor: CursorComponent;

  // Get tweets
  constructor(
    private twitterAPIService: TwitterAPIService,
    private highscoresService: HighscoresHandlerService,
    private scoreService: ScoreServiceService
  ) { }

  Splat($event) {
    this.splatX = '' + $event.clientX;
    this.splatY = '' + $event.clientY;

    if (this.gameState === 'Playing') {
      this.cursor.Throw();
    }
  }

  // when we click start game button
  StartGame() {

    // Set state to playing
    this.gameState = 'Playing';


    // Get num handles


    // If we haven't already pulled any tweets (from the twitter API)
    if (this.tweets.length === 0) {
      this.GetTweets();
    }
  }

  SettingsClicked()
  {
    if(this.gameState === 'Menu')
    {
      this.gameState = 'login';
    }
    else if(this.gameState === 'Settings')
    {
      this.gameState = 'Menu';
    }
  }

  GetTweets() {

    // get handles
    this.twitterAPIService.handlesReady.subscribe(handles => {

      this.numHandles = Object.keys(handles).length;
      for (let i = 0; i < this.tweetsPerHandle * this.numHandles; i++) {
        const speed = Math.random() * (30 - 6) + 6 + 's';
        this.tweets.push({ text: 'tmp', handle: 'tmp', img: null, delay: (i * 4) + 's', speed: speed });
      }

      console.log('Gotten handles, ' + this.numHandles + ' of them');

      console.log('Calling get tweets');
      // Get tweets by handles
      this.twitterAPIService.getTweets(handles, this.tweetsPerHandle);
      this.twitterAPIService.tweetsReady.subscribe(tweets => {

        console.log('Gotten tweets');
        // Shuffle the received tweets so we get a mixture of authors
        tweets = this.shuffle(tweets);

        // Init the tweet's text, handle, img and state
        for (let i = 0; i < tweets.length; i++) {
          this.tweets[i].text = (tweets[i].text);
          this.tweets[i].handle = (tweets[i].handle);
          this.tweets[i].img = (tweets[i].img);
          this.tweets[i].state = (tweets[i].state);
        }
        console.log(this.tweets);
        console.log('Finished retrieving tweets');
      });
    });
    console.log('Calling get handles');
    this.twitterAPIService.getHandles();
  }

  LogIn() {
    this.gameState = 'Settings';
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
    this.tweetsDone = 0;
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
      this.scoreService.SetScore(this.score);
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

  // Keep track of how many tweets have completed their lifecycle so we can loop back around
  TweetDone() {
    this.tweetsDone++;

    if (this.tweetsDone === this.tweetsPerHandle * this.numHandles && this.livesLeft > 0) {
      // Loop back around
      console.log('All tweets complete');
      this.tweetsRolling = false;
      setTimeout(() => { this.tweetsRolling = true; this.tweetsDone = 0; } , 1000);
    }
  }

  coordinates($event) {
    this.mouseX = $event.clientX;
    this.mouseY = $event.clientY;
  }
}
