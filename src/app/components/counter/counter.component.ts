import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styles: [
  ]
})
export class CounterComponent implements OnInit {

  @Input() private progress: number = 60;
  @Input() private color: string;
  @Output() private changeProgress: EventEmitter<number>;

  constructor(){
    this.changeProgress = new EventEmitter<number>()
  }

  ngOnInit(): void {
  }

  public get getProgress(): number{
    return this.progress;
  }

  public setProgress = (value: number = 0): void => {
    if( (this.progress + value ) <= 100 && (this.progress + value ) >= 0 ){
      this.progress += value;
      this.changeProgress.emit(this.progress);
    }
  }

  public get getColor(): string{
    return `btn btn-${this.color}`;
  }

}
