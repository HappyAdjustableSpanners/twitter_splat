import { OnChanges, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-splat',
  templateUrl: './splat.component.html',
  styleUrls: ['./splat.component.css'],
  animations: [
    trigger('myAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('invisible',   style({
        opacity: 0,
        transform: 'scale(0)'
      })),
      transition('invisible => visible', animate('300ms ease-in')),
    ])
  ]
})
export class SplatComponent implements OnChanges, AfterViewInit {

  @Input() splatX;
  @Input() splatY;

  state = 'invisible';

  detectChanges = false;

  resetState()
  {
    this.state = 'invisible';
  }
  ngOnChanges(changes: SimpleChanges)
  {
    if(this.detectChanges)
    {
      this.Splat();
    }
  }

  ngAfterViewInit()
  {
    this.detectChanges = true;
  }
  
  Splat()
  {
      this.state = 'visible';
  }
}
