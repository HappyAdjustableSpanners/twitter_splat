webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#menu-container {\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    text-align: center;\r\n    pointer-events: auto;\r\n    display: table;\r\n}\r\n\r\n#app-menu {\r\n    padding:0;\r\n    vertical-align: middle;\r\n    display: table-cell;\r\n    margin: 0;\r\n}\r\n\r\n#submit-score-menu {\r\n    padding:0;\r\n    vertical-align: middle;\r\n    display: table-cell;\r\n    margin: 0;\r\n}\r\n\r\n#game-over-menu {\r\n    padding:0;\r\n    vertical-align: middle;\r\n    display: table-cell;\r\n    margin: 0;\r\n}\r\n\r\n#menu-container {\r\n    overflow: hidden;\r\n}\r\n\r\n#cursor-container {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n#whd {\r\n    position: fixed;\r\n    bottom: 0;\r\n    right: 0;\r\n    font-family: Kalam;\r\n    padding-right: 10px;\r\n    color: white;\r\n}\r\n\r\n#whd img {\r\n    max-width: 15px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"menu-container\" class=\"container-fluid\" (click)=\"Splat($event)\" (mousemove)=\"coordinates($event)\">\n\n\n  <app-menu *ngIf=\"gameState == 'Menu'\" id=\"app-menu\" (onStartBtnPressed)=\"StartGame()\"></app-menu>\n\n  \n  <game-over-menu (playAgainBtnPressed)=\"PlayAgain()\" *ngIf=\"gameState == 'GameOver'\" id=\"game-over-menu\"></game-over-menu>\n  <lives *ngIf=\"gameState == 'Playing'\" [livesLeft]=\"livesLeft\"></lives>\n  <score *ngIf=\"gameState == 'Playing'\" [score]=\"score\"></score>\n  <div class=\"full-width-height\" *ngIf=\"gameState == 'Playing' && tweetsRolling\">\n      <div class=\"full-width-height\" *ngFor=\"let tweet of tweets\">\n        <tweet (tweetDone)=\"TweetDone()\" (onBadTweetClicked)=\"IncScore()\" (onGoodTweetClicked)=\"LoseLife()\" (onTweetMissed)=\"LoseLife()\" [text]=\"tweet.text\" [img]=\"tweet.img\" [handle]=\"tweet.handle\" [badgood]=\"tweet.state\" [delayTime]=\"tweet.delay\" [speedTime]=\"tweet.speed\"></tweet>\n      </div>\n  </div>\n  <submit-score (submitScore)=\"SubmitScore($event)\" id=\"submit-score-menu\" *ngIf=\"gameState == 'SubmitScore'\" [score]=\"score\"></submit-score>\n</div>\n\n<app-splat *ngIf=\"gameState ==='Playing'\" [splatX]=\"splatX\" [splatY]=\"splatY\"></app-splat>\n<app-cursor *ngIf=\"gameState === 'Playing'\" id=\"cursor-container\" #cursor [X]=\"mouseX\" [Y]=\"mouseY\"></app-cursor>\n\n<div id=\"whd\">\n    <b><p>Brought to you by WeHeartDigital Ltd <img src=\"assets/heart.png\"></p></b>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cursor_component__ = __webpack_require__("../../../../../src/app/cursor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_highscores_handler_service__ = __webpack_require__("../../../../../src/app/services/highscores-handler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_twitter_api_service__ = __webpack_require__("../../../../../src/app/services/twitter-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__score_service_service__ = __webpack_require__("../../../../../src/app/score-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    // Get tweets
    function AppComponent(twitterAPIService, highscoresService, scoreService) {
        this.twitterAPIService = twitterAPIService;
        this.highscoresService = highscoresService;
        this.scoreService = scoreService;
        // Tweets
        this.tweets = [];
        this.tweetsDone = 0;
        this.tweetsRolling = true;
        // Setup
        this.tweetsPerHandle = 30;
        this.numHandles = 6; // at the moment, needs the match how many handles are in the db
        // Gameplay
        this.score = 0;
        this.livesLeft = 3;
        this.gameState = 'Menu';
        // Splat
        this.splatX = '0';
        this.splatY = '0';
    }
    AppComponent.prototype.Splat = function ($event) {
        this.splatX = '' + $event.clientX;
        this.splatY = '' + $event.clientY;
        if (this.gameState === 'Playing') {
            this.cursor.Throw();
        }
    };
    // when we click start game button
    AppComponent.prototype.StartGame = function () {
        // Set state to playing
        this.gameState = 'Playing';
        // If we haven't already pulled any tweets (from the twitter API)
        if (this.tweets.length === 0) {
            this.GetTweets();
        }
    };
    AppComponent.prototype.GetTweets = function () {
        var _this = this;
        for (var i = 0; i < this.tweetsPerHandle * this.numHandles; i++) {
            var speed = Math.random() * (30 - 6) + 6 + 's';
            this.tweets.push({ text: 'tmp', handle: 'tmp', img: null, delay: (i * 5) + 's', speed: speed });
        }
        // get handles
        this.twitterAPIService.handlesReady.subscribe(function (handles) {
            console.log('Gotten handles');
            console.log('Calling get tweets');
            // Get tweets by handles
            _this.twitterAPIService.getTweets(handles, _this.tweetsPerHandle);
            _this.twitterAPIService.tweetsReady.subscribe(function (tweets) {
                console.log('Gotten tweets');
                // Shuffle the received tweets so we get a mixture of authors
                tweets = _this.shuffle(tweets);
                // Init the tweet's text, handle, img and state
                for (var i = 0; i < tweets.length; i++) {
                    _this.tweets[i].text = (tweets[i].text);
                    _this.tweets[i].handle = (tweets[i].handle);
                    _this.tweets[i].img = (tweets[i].img);
                    _this.tweets[i].state = (tweets[i].state);
                }
                console.log(_this.tweets);
                console.log('Finished retrieving tweets');
            });
        });
        console.log('Calling get handles');
        this.twitterAPIService.getHandles();
    };
    AppComponent.prototype.SubmitScore = function (name) {
        var _this = this;
        // Post score
        var newScore = { name: name, score: '' + this.score };
        this.highscoresService.PostHighScore(newScore);
        // Listen for when the high scores service has posted the score, before we change state to game over
        this.highscoresService.scorePosted.subscribe(function (res) {
            _this.gameState = 'GameOver';
        });
    };
    AppComponent.prototype.PlayAgain = function () {
        // Reset stats and change state back to menu
        this.livesLeft = 3;
        this.score = 0;
        this.gameState = 'Menu';
        this.tweetsDone = 0;
    };
    AppComponent.prototype.IncScore = function () {
        // Increment our score by 1
        this.score++;
    };
    AppComponent.prototype.LoseLife = function () {
        // Decrement our remaining lives by 1
        this.livesLeft--;
        // If lives are 0, game over
        if (this.livesLeft === 0) {
            // Change state to our submit score menu
            this.scoreService.SetScore(this.score);
            this.gameState = 'SubmitScore';
        }
    };
    // Shuffle array
    AppComponent.prototype.shuffle = function (array) {
        var counter = array.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    };
    // Keep track of how many tweets have completed their lifecycle so we can loop back around
    AppComponent.prototype.TweetDone = function () {
        var _this = this;
        this.tweetsDone++;
        if (this.tweetsDone === this.tweetsPerHandle * this.numHandles && this.livesLeft > 0) {
            // Loop back around
            console.log('All tweets complete');
            this.tweetsRolling = false;
            setTimeout(function () { _this.tweetsRolling = true; _this.tweetsDone = 0; }, 1000);
        }
    };
    AppComponent.prototype.coordinates = function ($event) {
        this.mouseX = $event.clientX;
        this.mouseY = $event.clientY;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_3" /* ViewChild */])('cursor'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__cursor_component__["a" /* CursorComponent */])
    ], AppComponent.prototype, "cursor", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_twitter_api_service__["a" /* TwitterAPIService */], __WEBPACK_IMPORTED_MODULE_1__services_highscores_handler_service__["a" /* HighscoresHandlerService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_twitter_api_service__["a" /* TwitterAPIService */],
            __WEBPACK_IMPORTED_MODULE_1__services_highscores_handler_service__["a" /* HighscoresHandlerService */],
            __WEBPACK_IMPORTED_MODULE_4__score_service_service__["a" /* ScoreServiceService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__score_service_service__ = __webpack_require__("../../../../../src/app/score-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__highscores_component__ = __webpack_require__("../../../../../src/app/highscores.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lives_component__ = __webpack_require__("../../../../../src/app/lives.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__score_component__ = __webpack_require__("../../../../../src/app/score.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tweet_component__ = __webpack_require__("../../../../../src/app/tweet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_twitter_handle_service__ = __webpack_require__("../../../../../src/app/services/twitter-handle.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__menu_component__ = __webpack_require__("../../../../../src/app/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__life_component__ = __webpack_require__("../../../../../src/app/life.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__game_over_menu_component__ = __webpack_require__("../../../../../src/app/game-over-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__submit_score_component__ = __webpack_require__("../../../../../src/app/submit-score.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__splat_component__ = __webpack_require__("../../../../../src/app/splat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__cursor_component__ = __webpack_require__("../../../../../src/app/cursor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__fb_share_btn_component__ = __webpack_require__("../../../../../src/app/fb-share-btn.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__twit_share_btn_component__ = __webpack_require__("../../../../../src/app/twit-share-btn.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__tweet_component__["a" /* TweetComponent */],
                __WEBPACK_IMPORTED_MODULE_12__menu_component__["a" /* MenuComponent */],
                __WEBPACK_IMPORTED_MODULE_3__score_component__["a" /* ScoreComponent */],
                __WEBPACK_IMPORTED_MODULE_2__lives_component__["a" /* LivesComponent */],
                __WEBPACK_IMPORTED_MODULE_13__life_component__["a" /* LifeComponent */],
                __WEBPACK_IMPORTED_MODULE_14__game_over_menu_component__["a" /* GameOverMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_1__highscores_component__["a" /* HighscoresComponent */],
                __WEBPACK_IMPORTED_MODULE_15__submit_score_component__["a" /* SubmitScoreComponent */],
                __WEBPACK_IMPORTED_MODULE_16__splat_component__["a" /* SplatComponent */],
                __WEBPACK_IMPORTED_MODULE_17__cursor_component__["a" /* CursorComponent */],
                __WEBPACK_IMPORTED_MODULE_18__fb_share_btn_component__["a" /* FbShareBtnComponent */],
                __WEBPACK_IMPORTED_MODULE_19__twit_share_btn_component__["a" /* TwitShareBtnComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_11__services_twitter_handle_service__["a" /* TwitterHandleService */], __WEBPACK_IMPORTED_MODULE_0__score_service_service__["a" /* ScoreServiceService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/cursor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#main-div {\r\n    pointer-events: none;\r\n    top: 0;\r\n    left: 0;\r\n    \r\n    position: relative;\r\n}\r\n\r\n#main-div > img {\r\n    position: absolute;\r\n    max-width: 200px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cursor.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" [style.left.px]=\"X - 50\" [style.top.px] = \"Y - 50\">\n  <img [@hand1]=\"{value: hand1State}\" (@hand1.done)=\"AnimationEnd()\" src=\"/assets/hand-1.png\">\n  <img [@hand2]=\"{value: hand2State}\" src=\"/assets/hand-2.png\">\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/cursor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromEvent__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/fromEvent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CursorComponent = (function () {
    function CursorComponent() {
        this.hand1State = 'visible';
        this.hand2State = 'invisible';
    }
    CursorComponent.prototype.Throw = function () {
        // Trigger animation which has 3 keyframes, then goes back to first state on animation end
        this.hand1State = 'invisible';
        this.hand2State = 'visible';
    };
    CursorComponent.prototype.AnimationEnd = function () {
        this.hand1State = 'visible';
        this.hand2State = 'invisible';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], CursorComponent.prototype, "X", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], CursorComponent.prototype, "Y", void 0);
    CursorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-cursor',
            template: __webpack_require__("../../../../../src/app/cursor.component.html"),
            styles: [__webpack_require__("../../../../../src/app/cursor.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["k" /* trigger */])('hand1', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* state */])('invisible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({
                        opacity: 0
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({
                        opacity: 1
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* transition */])('visible <=> invisible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('150ms ease-in'))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["k" /* trigger */])('hand2', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* state */])('invisible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({
                        opacity: 0
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* style */])({
                        opacity: 1
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* transition */])('visible <=> invisible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('150ms ease-in'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [])
    ], CursorComponent);
    return CursorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/fb-share-btn.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#fb-share-btn {\r\n    background-color: #415CB0;\r\n    color: white;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/fb-share-btn.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" id=\"fb-share-btn\" class=\"btn\" value=\"Share to Facebook\" (click)=\"Share()\">Share to Facebook <i class=\"fa fa-facebook\"></i></button>"

/***/ }),

/***/ "../../../../../src/app/fb-share-btn.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FbShareBtnComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vanilla_sharing__ = __webpack_require__("../../../../vanilla-sharing/dist/vanilla-sharing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vanilla_sharing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vanilla_sharing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__score_service_service__ = __webpack_require__("../../../../../src/app/score-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FbShareBtnComponent = (function () {
    function FbShareBtnComponent(scoreService) {
        this.scoreService = scoreService;
    }
    FbShareBtnComponent.prototype.Share = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1_vanilla_sharing__["fbShare"])({
            url: 'https://www.google.com',
            hashtag: '#splatter',
            quote: 'I scored ' + this.scoreService.GetScore() + ' in Splatter. Try it yourself!',
            fbAppId: '1652417111489882',
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], FbShareBtnComponent.prototype, "score", void 0);
    FbShareBtnComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'fb-share-btn',
            template: __webpack_require__("../../../../../src/app/fb-share-btn.component.html"),
            styles: [__webpack_require__("../../../../../src/app/fb-share-btn.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__score_service_service__["a" /* ScoreServiceService */]])
    ], FbShareBtnComponent);
    return FbShareBtnComponent;
}());



/***/ }),

/***/ "../../../../../src/app/game-over-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#main-div {\r\n    display: inline-block;\r\n    width:30%;\r\n    height: auto;\r\n    background-color: white;\r\n    border-radius: 10px;\r\n    pointer-events: auto;\r\n    padding: 10px;\r\n}\r\n\r\n#high-scores-txt {\r\n    margin: 0;\r\n}\r\n\r\n#lower-div {\r\n    border-radius: 0px 0px 35px 35px;\r\n    border: 10px solid #ffffff;\r\n    border-width: 0px 10px 10px 10px;\r\n    min-width: 100%;\r\n\r\n    font-family: Kalam;\r\n    color: white;\r\n    padding: 20px;\r\n}\r\n\r\n#upper-div p {\r\n    margin: 0;\r\n}\r\n\r\n#lower-div p {\r\n    margin: 0;\r\n}\r\n\r\n#upper-div {\r\n    border-radius: 35px 35px 0px 0px;\r\n    border: 10px solid #ffffff;\r\n    border-width: 10px 10px 10px 10px;\r\n\r\n    min-width: 100%;\r\n\r\n    font-family: Kalam;\r\n    color: white;\r\n    padding: 20px;\r\n}\r\n\r\n#play-again-btn {\r\n    background-color: #592c2b;\r\n    color: white;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/game-over-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-6 offset-md-3 no-padding\">\n            <div id=\"upper-div\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <!-- Game over -->\n                        <b>\n                            <p class=\"font-29\" id=\"high-scores-txt\">High Scores</p>\n                        </b>\n                    </div>\n                </div>\n            </div>\n            <div id=\"lower-div\">\n                <highscores></highscores>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <input id=\"play-again-btn\" type=\"button\" class=\"btn\" value=\"Play Again\" (click)=\"PlayAgain()\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/game-over-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameOverMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GameOverMenuComponent = (function () {
    function GameOverMenuComponent() {
        this.playAgainBtnPressed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    GameOverMenuComponent.prototype.PlayAgain = function () {
        // Trigger play again event
        this.playAgainBtnPressed.emit();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], GameOverMenuComponent.prototype, "playAgainBtnPressed", void 0);
    GameOverMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'game-over-menu',
            template: __webpack_require__("../../../../../src/app/game-over-menu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/game-over-menu.component.css")]
        })
    ], GameOverMenuComponent);
    return GameOverMenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/highscores.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#score-num {\r\n    color: #592c2b;\r\n}\r\n\r\n#score-name {\r\n    color: #592c2b;\r\n}\r\n\r\np {\r\n    margin: 0;\r\n}\r\n\r\nhr {\r\n    background-color: white;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/highscores.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let score of highscores\">\n    <div class=\"row\">\n        <p id=\"score-num\" class=\"col-md-6 font-29\"><b>{{score.score}}</b></p>\n        <p id=\"score-name\" class=\"col-md-6 font-29\">{{score.name}}</p>\n    </div>\n    <hr>\n</div>\n<div class=\"row\">\n        <div class=\"col-md-6 no-padding\">\n          <fb-share-btn></fb-share-btn>\n        </div>\n        <div class=\"col-md-6 no-padding\">\n          <twit-share-btn></twit-share-btn>\n        </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/highscores.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighscoresComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_highscores_handler_service__ = __webpack_require__("../../../../../src/app/services/highscores-handler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HighscoresComponent = (function () {
    function HighscoresComponent(highscoresService) {
        this.highscoresService = highscoresService;
        this.highscores = [];
    }
    HighscoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get the top 10 high scores
        this.highscoresService.highscoresReady.subscribe(function (highscores) {
            _this.highscores = highscores;
        });
        this.highscoresService.getTopXHighScore(5);
    };
    HighscoresComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'highscores',
            template: __webpack_require__("../../../../../src/app/highscores.component.html"),
            styles: [__webpack_require__("../../../../../src/app/highscores.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_0__services_highscores_handler_service__["a" /* HighscoresHandlerService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_highscores_handler_service__["a" /* HighscoresHandlerService */]])
    ], HighscoresComponent);
    return HighscoresComponent;
}());



/***/ }),

/***/ "../../../../../src/app/life.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "img {\r\n    width: 50px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/life.component.html":
/***/ (function(module, exports) {

module.exports = "<img [@myAnimation]=\"{value: state}\" src=\"/assets/heart.png\">"

/***/ }),

/***/ "../../../../../src/app/life.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LifeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var LifeComponent = (function () {
    function LifeComponent() {
    }
    LifeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'life',
            template: __webpack_require__("../../../../../src/app/life.component.html"),
            styles: [__webpack_require__("../../../../../src/app/life.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('myAnimation', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'scale(0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(500, Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'scale(1)' }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(500, Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], LifeComponent);
    return LifeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/lives.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#lives-list ul {\r\n    float: left;\r\n    padding: 0px;\r\n}\r\n#lives-list li {\r\n    display: inline;\r\n}\r\n\r\n#lives-list {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 65px;\r\n\r\n    background-color: rgba(255, 255, 255, 0.5);\r\n    \r\n    border-radius: 10px;\r\n    padding: 10px 10px 0px 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lives.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"lives-list\">\r\n    <li>\r\n        <ul><life *ngIf=\"livesLeft >= 3\"></life></ul>\r\n        <ul><life *ngIf=\"livesLeft >= 2\"></life></ul>\r\n        <ul><life *ngIf=\"livesLeft >= 1\"></life></ul>\r\n    </li>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/lives.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LivesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LivesComponent = (function () {
    function LivesComponent() {
        this.livesLeft = 3;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], LivesComponent.prototype, "livesLeft", void 0);
    LivesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'lives',
            template: __webpack_require__("../../../../../src/app/lives.component.html"),
            styles: [__webpack_require__("../../../../../src/app/lives.component.css")]
        })
    ], LivesComponent);
    return LivesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#start-btn {\r\n    width: 100%;\r\n}\r\n\r\n#main-div {\r\n    display: inline-block;\r\n    width:60%;\r\n    height: auto;\r\n\r\n    border-radius: 10px;\r\n}\r\n\r\n#title {\r\n    width: 100%;\r\n}\r\n\r\n#intro-text {\r\n    width: 70%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/menu.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div [@myAnimation]='{ value: state }' id=\"main-div\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <img class=\"img-fluid img-responsive\" id=\"title\" src=\"assets/title.png\">\r\n        </div>\r\n        <div class=\"col-md-12\">\r\n                <img class=\"img-fluid img-responsive\" id=\"intro-text\" src=\"assets/intro-text.png\">\r\n            </div>\r\n    </div>\r\n    <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n            <a id=\"start-btn\" (click)=\"StartGame()\"><img class=\"img-fluid img-responsive\"   [src]=\"imageUrl\"></a>\r\n        </div>\r\n    </div>\r\n</div> \r\n"

/***/ }),

/***/ "../../../../../src/app/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuComponent = (function () {
    function MenuComponent(cdRef) {
        this.cdRef = cdRef;
        this.onStartBtnPressed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        // Start as visible
        this.state = 'invisible';
        this.imageUrl = 'assets/btn-start-up.png';
    }
    MenuComponent.prototype.ngAfterViewInit = function () {
        this.state = 'visible';
        this.cdRef.detectChanges();
    };
    MenuComponent.prototype.StartGame = function () {
        var _this = this;
        this.imageUrl = 'assets/btn-start-down.png';
        setTimeout(function () {
            // When the game starts change to invisible
            _this.state = 'invisible';
            // trigger start event
            _this.onStartBtnPressed.emit();
        }, 50);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], MenuComponent.prototype, "onStartBtnPressed", void 0);
    MenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-menu',
            template: __webpack_require__("../../../../../src/app/menu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/menu.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('myAnimation', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'scale(1)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('invisible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'scale(0)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('invisible => visible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('500ms ease-in-out')),
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/score-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScoreServiceService = (function () {
    function ScoreServiceService() {
    }
    ScoreServiceService.prototype.GetScore = function () {
        return this.score;
    };
    ScoreServiceService.prototype.SetScore = function (score) {
        this.score = score;
    };
    ScoreServiceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ScoreServiceService);
    return ScoreServiceService;
}());



/***/ }),

/***/ "../../../../../src/app/score.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#score-div {\r\n    width: 50px;\r\n    height: 50px;\r\n    position: fixed;\r\n    top: 0;\r\n    right: 6px;\r\n    padding: 10px;\r\n}\r\n\r\n#score {\r\n    font-size: 53px;\r\n    font-family: VT323;\r\n    color: white;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/score.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"score-div\" [@scoreUp]='{ value: state }' (@scoreUp.done)=\"AnimationDone()\">\r\n    <p id=\"score\">{{score}}</p>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/score.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScoreComponent = (function () {
    function ScoreComponent(cdRef) {
        this.cdRef = cdRef;
        // Init state as inactive
        this.state = 'inactive';
    }
    ScoreComponent.prototype.AnimationDone = function () {
        // when the animation is complete, go back to being inactive
        this.state = 'inactive';
    };
    ScoreComponent.prototype.ngOnChanges = function (changes) {
        // Whenever the score changes, go back to being active
        this.state = 'active';
        this.cdRef.detectChanges();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], ScoreComponent.prototype, "score", void 0);
    ScoreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'score',
            template: __webpack_require__("../../../../../src/app/score.component.html"),
            styles: [__webpack_require__("../../../../../src/app/score.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('scoreUp', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('inactive', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'scale(1)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('active', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'scale(1.5)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('inactive <=> active', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('300ms ease-in'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], ScoreComponent);
    return ScoreComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/highscores-handler.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighscoresHandlerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HighscoresHandlerService = (function () {
    function HighscoresHandlerService(http) {
        this.http = http;
        this.highscoresReady = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */]();
        this.scorePosted = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */]();
    }
    // get all high scores
    HighscoresHandlerService.prototype.getAllHighscores = function () {
        this.http.get("http://localhost:3000/api/highscores").toPromise().then(function (response) {
            return response;
        });
    };
    HighscoresHandlerService.prototype.getTopXHighScore = function (x) {
        var _this = this;
        this.http.get("http://localhost:3000/api/highscores").toPromise().then(function (response) {
            console.log(response.json());
            // All highscores
            var data = response.json();
            data.sort(function (a, b) {
                return b.score - a.score;
            });
            // grab the first 10 numbers
            var firstX = data.slice(0, x);
            _this.highscoresReady.emit(firstX);
        });
    };
    HighscoresHandlerService.prototype.PostHighScore = function (score) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/highscores', JSON.stringify(score), { headers: headers }).map(function (res) {
            res.json();
            _this.scorePosted.emit();
        }).subscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */])
    ], HighscoresHandlerService.prototype, "highscoresReady", void 0);
    HighscoresHandlerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
    ], HighscoresHandlerService);
    return HighscoresHandlerService;
}());



/***/ }),

/***/ "../../../../../src/app/services/twitter-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterAPIService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__twitter_handle_service__ = __webpack_require__("../../../../../src/app/services/twitter-handle.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TwitterAPIService = (function () {
    function TwitterAPIService(http, twitterHandleService) {
        this.http = http;
        this.twitterHandleService = twitterHandleService;
        this.tweets = [];
        this.text = [];
        this.tweetsReady = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */]();
        this.handlesReady = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */]();
        console.log('Twitter api service initialised');
    }
    TwitterAPIService.prototype.getHandles = function () {
        var _this = this;
        this.twitterHandleService.getTwitterHandles()
            .subscribe(function (res) {
            _this.handlesReady.emit(res);
            // console.log(handles);
            // return this.http.get(`http://localhost:3000/` + handles[0]['handle']).toPromise().then(
            //     response => { this.tweetsReady.emit(response.json() as Tweet[] ); }
            // );
        });
    };
    TwitterAPIService.prototype.getTweets = function (handles, numTweets) {
        var _this = this;
        var tweets = [];
        var count = 0;
        var _loop_1 = function (i) {
            // For each handle, make an api call
            this_1.http.get("http://localhost:3000/tweets?handle=" + handles[i]['handle'] + '&count=' + numTweets).toPromise().then(function (response) {
                // Only use this handle if they have least 100 tweets
                if (response.json().length < numTweets) {
                    console.log('user ' + handles[i]['handle'] + ' does not have enough tweets, skipping user');
                    count++;
                    return;
                }
                for (var j = 0; j < response.json().length; j++) {
                    var data = response.json()[j];
                    data.state = handles[i]['state'];
                    tweets.push(data);
                }
                count++;
                if (count === handles.length) {
                    _this.tweetsReady.emit(tweets);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < handles.length; i++) {
            _loop_1(i);
        }
    };
    TwitterAPIService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__twitter_handle_service__["a" /* TwitterHandleService */]])
    ], TwitterAPIService);
    return TwitterAPIService;
}());



/***/ }),

/***/ "../../../../../src/app/services/twitter-handle.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterHandleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TwitterHandleService = (function () {
    function TwitterHandleService(http) {
        this.http = http;
        console.log('Mongo db twitter handle service initialised');
    }
    TwitterHandleService.prototype.getTwitterHandles = function () {
        return this.http.get('http://localhost:3000/api/tasks')
            .map(function (res) { return res.json(); });
    };
    TwitterHandleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], TwitterHandleService);
    return TwitterHandleService;
}());



/***/ }),

/***/ "../../../../../src/app/splat.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#splat {\r\n    position: fixed;\r\n    pointer-events: none;\r\n}\r\n\r\n#splat-img {\r\n    max-width: 200px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/splat.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"splat\" [@myAnimation]='{ value: state }' (@myAnimation.done)=\"resetState()\" [style.left.px]=\"splatX - 100\" [style.top.px] = \"splatY - 100\" ><img id=\"splat-img\" src=\"/assets/splat.png\"></div>"

/***/ }),

/***/ "../../../../../src/app/splat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SplatComponent = (function () {
    function SplatComponent() {
        // Init state as invisible
        this.state = 'invisible';
        // Only want to check for a click after view init so the animation isnt instant
        this.detectChanges = false;
    }
    SplatComponent.prototype.ngAfterViewInit = function () {
        this.detectChanges = true;
        this.audio = new Audio();
        this.audio.src = '/assets/splat.wav';
        this.audio.load();
        this.audio2 = new Audio();
        this.audio2.src = '/assets/splat2.wav';
        this.audio2.load();
        this.audio3 = new Audio();
        this.audio3.src = '/assets/splat3.wav';
        this.audio3.load();
        this.audio4 = new Audio();
        this.audio4.src = '/assets/splat4.wav';
        this.audio4.load();
    };
    // If the X or Y coords change, the user has clicked, so trigger the animation
    SplatComponent.prototype.ngOnChanges = function (changes) {
        this.state = 'invisible';
        if (this.detectChanges) {
            this.Splat();
        }
    };
    // Reset state to invisible after animation is complete
    SplatComponent.prototype.resetState = function () {
        this.state = 'invisible';
    };
    // Change state to visible
    SplatComponent.prototype.Splat = function () {
        // random number to choose sound
        var rand = Math.floor(Math.random() * 4);
        switch (rand) {
            case 0:
                this.audio.play();
                break;
            case 1:
                this.audio2.play();
                break;
            case 2:
                this.audio3.play();
                break;
            case 3:
                this.audio4.play();
                break;
        }
        this.state = 'visible';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SplatComponent.prototype, "splatX", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SplatComponent.prototype, "splatY", void 0);
    SplatComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-splat',
            template: __webpack_require__("../../../../../src/app/splat.component.html"),
            styles: [__webpack_require__("../../../../../src/app/splat.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('myAnimation', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({})),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('invisible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        opacity: 0
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('invisible => visible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('500ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateY(0%) scale(0)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateY(0%) scale(1)', offset: 0.1 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateY(10%) scale(1)', offset: 1.0 })
                    ]))),
                ])
            ]
        })
    ], SplatComponent);
    return SplatComponent;
}());



/***/ }),

/***/ "../../../../../src/app/submit-score.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#lower-div {\r\n    border-radius: 0px 0px 35px 35px;\r\n    border: 10px solid #ffffff;\r\n    border-width: 0px 10px 10px 10px;\r\n    min-width: 100%;\r\n\r\n    font-family: Kalam;\r\n    color: white;\r\n    padding: 20px;\r\n}\r\n\r\n#upper-div p {\r\n    margin: 0;\r\n}\r\n\r\n#lower-div p {\r\n    margin: 0;\r\n}\r\n\r\n#upper-div {\r\n    border-radius: 35px 35px 0px 0px;\r\n    border: 10px solid #ffffff;\r\n    border-width: 10px 10px 10px 10px;\r\n\r\n    min-width: 100%;\r\n\r\n    font-family: Kalam;\r\n    color: white;\r\n    padding: 20px;\r\n}\r\n\r\n#input-name {\r\n    margin-right: -6px;\r\n    height: 40px;\r\n    border-radius: 5px 0px 0px 5px;\r\n    border-width: 0;\r\n    padding: 6px;\r\n    color: #0FC2F2\r\n}\r\n\r\n#input-save {\r\n    background-color: #592c2b;\r\n    border: 0;\r\n    border-radius: 0px 5px 5px 0px;\r\n    color:white;\r\n    height: 40px;\r\n}\r\n\r\n#game-over-txt {\r\n    margin: 0;\r\n}\r\n\r\n#score-txt {\r\n    font-family: VT323;\r\n    font-size: 95px;\r\n    color: #592c2b;\r\n}\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/submit-score.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-6 offset-md-3 no-padding\">\n      <div id=\"upper-div\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <!-- Game over -->\n                <b><p class=\"font-29\" id=\"game-over-txt\" >Game Over</p></b>\n              </div>\n            </div>\n      </div>\n      <div id=\"lower-div\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <!-- You score -->\n            <b><p class=\"font-58\">You scored</p></b>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <!-- Score -->\n            <p id=\"score-txt\">{{score}}</p>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <!-- Enter your name -->\n            <b><p class=\"font-29\">Enter your name</p></b>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <!-- Name and submit button -->\n            <b><input class=\"font-27\" id=\"input-name\" type=\"text\" placeholder=\"Name\" [(ngModel)]=\"name\"></b>\n            <b><input class=\"font-27\" id=\"input-save\" type=\"button\" value=\"Save\" (click)=\"SubmitScore()\"></b>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/submit-score.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitScoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SubmitScoreComponent = (function () {
    function SubmitScoreComponent() {
        this.submitScore = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    // When button clicked, submit score
    SubmitScoreComponent.prototype.SubmitScore = function () {
        if (this.name !== undefined) {
            this.submitScore.emit(this.name);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], SubmitScoreComponent.prototype, "submitScore", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SubmitScoreComponent.prototype, "score", void 0);
    SubmitScoreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'submit-score',
            template: __webpack_require__("../../../../../src/app/submit-score.component.html"),
            styles: [__webpack_require__("../../../../../src/app/submit-score.component.css")]
        })
    ], SubmitScoreComponent);
    return SubmitScoreComponent;
}());



/***/ }),

/***/ "../../../../../src/app/tweet.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n#tweet-img {\r\n    border-radius: 4px;\r\n}\r\n\r\n.embedded-tweet {\r\n\r\n    padding: 10px 20px 20px 20px;\r\n    height: 100%;\r\n    width: 100%;\r\n\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n\r\n    text-align: left;\r\n}\r\n\r\n#tweet-container {\r\n    width: 70%;\r\n    height: 70%;\r\n    word-wrap: break-word;\r\n    padding: 5px 10px 10px 10px;\r\n    box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.75);\r\n\r\n    border: 1px solid #e1e8ed;\r\n    border-width: 0 1px 1px;\r\n    border-radius: 2%;\r\n}\r\n\r\n#tweet-parent-container {\r\n    position:fixed;\r\n    pointer-events: none;\r\n}\r\n\r\n.visible {\r\n    visibility: visible;\r\n}\r\n\r\n.invisible {\r\n    visibility: hidden;\r\n}\r\n\r\n#tweet-btn {\r\n    width: 70%;\r\n    height: 70%;\r\n    left: 0;\r\n    top: 0;\r\n    position: absolute;\r\n    opacity: 0;\r\n    pointer-events: auto;\r\n}\r\n\r\n#tweet-handle {\r\n    padding-left: 10px;\r\n}\r\n\r\n.bad {\r\n    /* background-color: rgb(207, 13, 13); */\r\n}\r\n\r\n.good {\r\n    /* background-color: rgb(13, 161, 13); */\r\n}\r\n\r\n#indicator {\r\n    width: 5px;\r\n    height: 5px;\r\n}\r\n\r\n#tweet-txt {\r\n    padding-top: 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/tweet.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!done\" id=\"tweet-parent-container\" [@myAnimation]='{ value: state, params: { delay: delayTime, speed: speedTime } }' (@myAnimation.done)=\"animationDone($event)\" [ngStyle]=\"{ 'top': top, 'left': left, 'right':right, 'bottom':bottom, 'width': width, 'height': height }\">\r\n    <div [@clicked]='{ value: visibility }' id=\"tweet-container\">\r\n        <div class=\"embedded-tweet\">\r\n            <div class=\"row\">\r\n            <input id=\"tweet-btn\" type=\"button\" (click)=\"Clicked()\">\r\n            </div>\r\n            <div class=\"row\">\r\n                <img id=\"tweet-img\" src='{{img}}'>\r\n                <!-- <p id=\"tweet-handle\"><b>{{handle}}</b></p> -->\r\n                <div id=\"indicator\"  [ngClass]=\"(badgood == 'bad')?'bad':'good'\"></div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <p id=\"tweet-txt\">{{text}}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/tweet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TweetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TweetComponent = (function () {
    function TweetComponent(cdRef) {
        this.cdRef = cdRef;
        // Three events
        this.onGoodTweetClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.onBadTweetClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.onTweetMissed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.tweetDone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.width = '25%';
        this.height = '25%';
        // Animation
        this.done = false;
        this.visibility = 'visible';
    }
    TweetComponent.prototype.Clicked = function () {
        // Emit click events
        if (this.badgood === 'good' && this.visibility !== 'invisible') {
            this.onGoodTweetClicked.emit();
            this.visibility = 'invisible-red';
        }
        else if (this.badgood === 'bad') {
            this.onBadTweetClicked.emit();
            this.visibility = 'invisible-green';
        }
    };
    TweetComponent.prototype.ngOnInit = function () {
        // Define limits so the tweet stays on the screen
        var limit = 80;
        // random number to choose animation state
        var rand = Math.floor(Math.random() * 4);
        // Choose a state, and depending on that state, change some initial positional styling
        switch (rand) {
            case 0:
                this.state = 'lToR';
                this.top = Math.floor(Math.random() * limit) + '%';
                this.left = '0%';
                break;
            case 1:
                this.state = 'rToL';
                this.top = Math.floor(Math.random() * limit) + '%';
                this.right = '0%';
                break;
            case 2:
                this.state = 'bToT';
                this.left = Math.floor(Math.random() * limit) + '%';
                this.bottom = '0%';
                break;
            case 3:
                this.state = 'tToB';
                this.left = Math.floor(Math.random() * limit) + '%';
                this.top = '0%';
                break;
        }
    };
    TweetComponent.prototype.ngAfterViewInit = function () {
        this.animateMe();
    };
    TweetComponent.prototype.animateMe = function () {
        // Depending on our initial state, choose an animation (e.g. if we init at left of screen, we want to fly from left to right
        if (this.state === 'lToR') {
            this.state = 'rToL';
        }
        else if (this.state === 'rToL') {
            this.state = 'lToR';
        }
        else if (this.state === 'bToT') {
            this.state = 'tToB';
        }
        else if (this.state === 'tToB') {
            this.state = 'bToT';
        }
        this.cdRef.detectChanges();
    };
    TweetComponent.prototype.animationDone = function ($event) {
        // If the animation is done, and the state is not 'from' or 'to' void (being created or destroyed)
        if (this.text !== 'tmp' && $event.toState !== 'void' && $event.fromState !== 'void') {
            // If this is a bad tweet, and it is not currently invisible (e.g. it hasn't already been clicked)
            if (this.badgood === 'bad' && this.visibility !== 'invisible-red' && this.visibility !== 'invisible-green') {
                // Emit tweet missed event
                this.onTweetMissed.emit();
            }
            // If the animation is done, whatever the tweet, stop rendering
            this.done = true;
            this.tweetDone.emit();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TweetComponent.prototype, "text", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TweetComponent.prototype, "handle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TweetComponent.prototype, "img", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TweetComponent.prototype, "badgood", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TweetComponent.prototype, "delayTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TweetComponent.prototype, "speedTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], TweetComponent.prototype, "onGoodTweetClicked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], TweetComponent.prototype, "onBadTweetClicked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], TweetComponent.prototype, "onTweetMissed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], TweetComponent.prototype, "tweetDone", void 0);
    TweetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tweet',
            template: __webpack_require__("../../../../../src/app/tweet.component.html"),
            styles: [__webpack_require__("../../../../../src/app/tweet.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('myAnimation', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('rToL', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateX(410%)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('lToR', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateX(-410%)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('bToT', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateY(410%)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('tToB', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateY(-410%)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('bToT <=> tToB', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('{{speed}} {{delay}}')),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('lToR <=> rToL', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('{{speed}} {{delay}}')),
                ]),
                [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('clicked', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                            backgroundColor: 'white',
                        })),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('invisible-red', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                            opacity: 0
                        })),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('invisible-green', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                            opacity: 0
                        })),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('visible => invisible-red', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('800ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'scale(1) rotate(0deg)', backgroundColor: 'white', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'scale(1) rotate(0deg)', backgroundColor: '#ba1c21', offset: 0.2 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'scale(0) rotate(100deg)', backgroundColor: '#ba1c21', offset: 1.0 })
                        ]))),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('visible => invisible-green', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('800ms ease-in', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'scale(1) rotate(0deg)', backgroundColor: 'white', offset: 0 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'scale(1) rotate(0deg)', backgroundColor: '#008e4a', offset: 0.2 }),
                            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'scale(0) rotate(100deg)', backgroundColor: '#008e4a', offset: 1.0 })
                        ]))),
                    ])
                ]
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], TweetComponent);
    return TweetComponent;
}());



/***/ }),

/***/ "../../../../../src/app/twit-share-btn.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#twit-share-btn {\r\n    background-color: #55ACEE;\r\n    color: white;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/twit-share-btn.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" id=\"twit-share-btn\" class=\"btn\" value=\"Share to Twitter\" (click)=\"Share()\">Share to Twitter <i class=\"fa fa-twitter\"></i></button>"

/***/ }),

/***/ "../../../../../src/app/twit-share-btn.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitShareBtnComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vanilla_sharing__ = __webpack_require__("../../../../vanilla-sharing/dist/vanilla-sharing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vanilla_sharing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vanilla_sharing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__score_service_service__ = __webpack_require__("../../../../../src/app/score-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TwitShareBtnComponent = (function () {
    function TwitShareBtnComponent(scoreService) {
        this.scoreService = scoreService;
    }
    TwitShareBtnComponent.prototype.Share = function () {
        Object(__WEBPACK_IMPORTED_MODULE_1_vanilla_sharing__["tw"])({
            url: 'https://www.google.com',
            title: 'I scored ' + this.scoreService.GetScore() + ' in Splatter. Try it yourself!',
        });
    };
    TwitShareBtnComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'twit-share-btn',
            template: __webpack_require__("../../../../../src/app/twit-share-btn.component.html"),
            styles: [__webpack_require__("../../../../../src/app/twit-share-btn.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__score_service_service__["a" /* ScoreServiceService */]])
    ], TwitShareBtnComponent);
    return TwitShareBtnComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map