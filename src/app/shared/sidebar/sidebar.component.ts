import { Component, OnInit } from '@angular/core';
import { SidebatService } from '../../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  private menu: any[];

  constructor(
    private  side: SidebatService
  ){
    this.menu = this.side.getMenu;
  }

  ngOnInit(): void{
  }

  public get getMenu(): any[]{
    return this.menu;
  }

}
