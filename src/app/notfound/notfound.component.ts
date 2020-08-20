import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./ntofound.component.css']
})
export class NotfoundComponent implements OnInit {

  private year: number;

  constructor(){
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

  public get getYear(): number{
    return this.year;
  }

}
