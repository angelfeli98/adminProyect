import { Component, OnInit } from '@angular/core';
import { SidebatService } from '../../service/sidebar.service';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  private menu: any[];
  private user: UserModel;

  constructor(
    private  side: SidebatService,
    private userService: UserService
  ){
    this.menu = this.side.getMenu;
    this.user = this.userService.user;
  }

  ngOnInit(): void{
  }

  public get getMenu(): any[]{
    return this.menu;
  }

  public get getUser(): UserModel{
    return this.user;
  }

}
