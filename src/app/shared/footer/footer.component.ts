import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

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
