import { HighscoresComponent } from './highscores.component';
import { LivesComponent } from './lives.component';
import { ScoreComponent } from './score.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { TweetComponent } from './tweet.component';
import { TwitterHandleService } from './services/twitter-handle.service';
import { MenuComponent } from './menu.component';
import { LifeComponent } from './life.component';
import { GameOverMenuComponent } from './game-over-menu.component';
import { SubmitScoreComponent } from './submit-score.component';
import { SplatComponent } from './splat.component';
import { CursorComponent } from './cursor.component';



@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    MenuComponent,
    ScoreComponent,
    LivesComponent,
    LifeComponent,
    GameOverMenuComponent,
    HighscoresComponent,
    SubmitScoreComponent,
    SplatComponent,
    CursorComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [TwitterHandleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
