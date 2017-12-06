import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.css'],
    animations: [
        trigger('myAnimation', [
            state('rToL', style({
                transform: 'translateX(410%)'
            })),
            state('lToR', style({
                transform: 'translateX(-410%)'
            })),
            state('bToT', style({
                transform: 'translateY(410%)'
            })),
            state('tToB', style({
                transform: 'translateY(-410%)'
            })),

            transition('bToT <=> tToB', animate('{{speed}} {{delay}}')),
            transition('lToR <=> rToL', animate('{{speed}} {{delay}}')),
        ]),
        [
            trigger('clicked', [
                state('visible', style({
                    opacity: 1,
                    transform: 'scale(1) rotate(0deg)'
                })),
                state('invisible', style({
                    opacity: 0,
                    transform: 'scale(0) rotate(100deg)'
                })),
                transition('visible => invisible', animate('100ms 200ms ease-in')),
            ])
        ]

    ]
})
export class TweetComponent implements AfterViewInit, OnInit {

    // Tweet attributes
    @Input() text;
    @Input() handle;
    @Input() img;
    @Input() badgood;
    @Input() delayTime;
    @Input() speedTime;

    // Three events
    @Output() onGoodTweetClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onBadTweetClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onTweetMissed: EventEmitter<any> = new EventEmitter<any>();
    @Output() tweetDone: EventEmitter<any> = new EventEmitter<any>();


    // Dynamic styling props
    state: string;
    top: string;
    left: string;
    bottom: string;
    right: string;
    width = '25%';
    height = '25%';
    color = 'red';

    // Animation
    done = false;
    visibility = 'visible';

    Clicked() {

        // Emit click events
        if (this.badgood === 'good' && this.visibility !== 'invisible') {
            this.onGoodTweetClicked.emit();
        } else if (this.badgood === 'bad') {
            this.onBadTweetClicked.emit();
        }

        // Change visibility to invisible
        this.visibility = 'invisible';
    }

    ngOnInit() {

        // Define limits so the tweet stays on the screen
        const limit = 80;

        // random number to choose animation state
        const rand = Math.floor(Math.random() * 4);

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
    }

    ngAfterViewInit() {
        this.animateMe();
    }

    animateMe() {
        // Depending on our initial state, choose an animation (e.g. if we init at left of screen, we want to fly from left to right
        if (this.state === 'lToR') {
            this.state = 'rToL';
        } else if (this.state === 'rToL') {
            this.state = 'lToR';
        } else if (this.state === 'bToT') {
            this.state = 'tToB';
        } else if (this.state === 'tToB') {
            this.state = 'bToT';
        }
    }

    animationDone($event) {

        // If the animation is done, and the state is not 'from' or 'to' void (being created or destroyed)
        if (this.text !== 'tmp' && $event.toState !== 'void' && $event.fromState !== 'void') {

            // If this is a bad tweet, and it is not currently invisible (e.g. it hasn't already been clicked)
            if (this.badgood === 'bad' && this.visibility !== 'invisible') {

                // Emit tweet missed event
                this.onTweetMissed.emit();
            }

            // If the animation is done, whatever the tweet, stop rendering
            this.done = true;
            this.tweetDone.emit();
        }
    }
}
