import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';
import { CollectionService } from '../../service/collections.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  private user: UserModel;

  constructor(
    private router: Router,
    private userService: UserService,
    private collection: CollectionService
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

  public makeSearch = (field: string): void => {
    this.collection.getByField(field)
                    .subscribe( res => this.router.navigateByUrl('/dashboard/search') );
  }

}
