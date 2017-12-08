import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  username;
  password;

  @Output() login: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  LogIn()
  {
    if (this.username === 'test' && this.password === 'test')
    {
      this.login.emit();
    }
  }
}
