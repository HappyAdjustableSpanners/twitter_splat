import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
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
              transform: 'scale(1)'
            })),
            state('invisible',   style({
              opacity: 0,
              transform: 'scale(1.1)'
            })),
            transition('visible => invisible', animate('100ms ease-in')),
          ])
    ]

  ]
})
export class TweetComponent implements AfterViewInit, OnInit {

    @Input() text;
    @Input() handle;
    @Input() img;
    @Input() badgood;

    @Input() delayTime;
    @Input() speedTime;

    @Output() onGoodTweetClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onBadTweetClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onTweetMissed: EventEmitter<any> = new EventEmitter<any>();
    

    state: string;
    top: string;
    left: string;
    bottom: string;
    right: string;
    width = '25%';
    height = '25%';

    color = 'red';

    done = false;

    clicked = 'visible';
    Clicked()
    {

        // inc score if this is a bad tweet

        // trigger event to inc score, app component subscribes to event, and has a score property bound to score component

        if(this.badgood === 'good' && this.clicked !== 'invisible')
        {
            this.onGoodTweetClicked.emit();
        }
        else if(this.badgood === 'bad')
        {
            this.onBadTweetClicked.emit();
        }

        this.clicked = 'invisible';
    }

    ngOnInit()
    {

        // random number
        let rand = Math.floor(Math.random() * 4);

        let limitVertical = 80;
        let limitHorizontal = 80;

        console.log("init");

        // random state
        switch (rand) {
            case 0:
                this.state = 'lToR';
                this.top = Math.floor(Math.random() * limitHorizontal) + '%';
                this.left = '0%';
                break;
            case 1:
                this.state = 'rToL';
                this.top = Math.floor(Math.random() * limitHorizontal) + '%';
                this.right = '0%';
                break;
            case 2:
                this.state = 'bToT';
                this.left = Math.floor(Math.random() * limitVertical) + '%';
                this.bottom = '0%';
                break;
            case 3:
                this.state = 'tToB';
                this.left = Math.floor(Math.random() * limitVertical) + '%';
                this.top = '0%';
                break;
        }
    }

    ngAfterViewInit() {
        this.animateMe();
    }

    animateMe() {
        // if state = righttoleft

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
    }

    animationDone($event)
    {
        if(this.text != "tmp" && $event.toState !== "void" && $event.fromState !== "void")
        {
            console.log("animation finished");
            if (this.badgood === 'bad' && this.clicked !== 'invisible')
            {
                this.onTweetMissed.emit();
                this.done = true;
            }
        }
    }
}
