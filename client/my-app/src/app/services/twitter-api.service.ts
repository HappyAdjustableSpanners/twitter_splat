import { Tweet } from './../models/tweet';
import { TwitterHandleService } from './twitter-handle.service';
import { Injectable, EventEmitter } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitterAPIService {

    tweets: Tweet[] = [];

    text: string[] = [];

    tweetsReady = new EventEmitter();
    handlesReady = new EventEmitter();

    constructor(private http: Http, private twitterHandleService: TwitterHandleService) {
        console.log('Twitter api service initialised');
    }

    getHandles() {

        this.twitterHandleService.getTwitterHandles()
        .subscribe(res => {
            this.handlesReady.emit(res);
            // console.log(handles);

            // return this.http.get(`http://localhost:3000/` + handles[0]['handle']).toPromise().then(
            //     response => { this.tweetsReady.emit(response.json() as Tweet[] ); }
            // );
        });
    }

    getTweets(handles: any[]) {

        let tweets = [];

        let count = 0;

        for ( let i = 0; i < handles.length; i++)
        {
            // For each handle, make an api call
            this.http.get(`http://localhost:3000/handles/` + handles[i]['handle']).toPromise().then(
                response => {

                    // Only use this handle if they have least 100 tweets
                    if (response.json().length < 100)
                    {
                        count++;
                        return;
                    }

                    for (let j = 0; j < response.json().length; j++) {
                        let data = response.json()[j];
                        data.state = handles[i]['state'];
                        tweets.push(data);
                    }
                    count++;
                    if (count === handles.length) {
                        this.tweetsReady.emit(tweets);
                    }
                });
        }
    }
}
