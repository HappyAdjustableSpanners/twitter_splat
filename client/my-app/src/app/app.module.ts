import { ScoreServiceService } from './score-service.service';
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
import { FbShareBtnComponent } from './fb-share-btn.component';
import { TwitShareBtnComponent } from './twit-share-btn.component';
import { SettingsComponentComponent } from './settings-component.component';
import { AdminLoginComponent } from './admin-login.component';



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
    FbShareBtnComponent,
    TwitShareBtnComponent,
    SettingsComponentComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [TwitterHandleService, ScoreServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
