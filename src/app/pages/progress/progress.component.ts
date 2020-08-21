import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  private progressOne: number;
  private progressTwo: number;

  constructor(){
    this.progressOne = 50;
    this.progressTwo = 30;
  }

  ngOnInit(): void {
  }

  public get getProgressOne(): number{
    return this.progressOne;
  }

  public get getProgressTwo(): number{
    return this.progressTwo;
  }

  public set setProgressOne(value: number){
    this.progressOne = value;
  }

  public set setProgressTwo(value: number){
    this.progressTwo = value;
  }
}
