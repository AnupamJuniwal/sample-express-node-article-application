import { Component } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.css'],
  animations: [
    trigger('finderState', [
      state('inactive', style({
        'z-index': '-1',
        'opacity': '0'
      })),
      state('active',   style({
        'z-index': '98',
        'opacity': '1'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})

export class AppComponent {
  title = 'Article Library';
  finderState = 'inactive';

  constructor(){
  }

  toggleState(){
    this.finderState = this.finderState === 'active' ? 'inactive' : 'active';
    }

  closeFinder(){
    this.finderState = 'inactive';
    }


}
