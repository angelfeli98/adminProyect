import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  private user: UserModel;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ){
    this.user = this.userService.user;
  }

  ngOnInit(): void {
  }

  public logOut = (): void => {
    this.userService.signOut();
  }

  public get getUser(): any{
    return this.user;
  }

}
