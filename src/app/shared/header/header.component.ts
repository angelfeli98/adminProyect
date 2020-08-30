import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public logOut = (): void => {
    this.ngZone.run(() => {
      this.userService.signOut();
    });
  }

}
