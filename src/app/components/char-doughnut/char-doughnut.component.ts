import { Component, OnInit, Input } from '@angular/core';

import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';

import { CharDoughnut } from '../../interfaces/char-dougtnut.interface';

@Component({
  selector: 'app-char-doughnut',
  templateUrl: './char-doughnut.component.html',
  styleUrls: ['./char-doughnut.component.css']
})
export class CharDoughnutComponent implements OnInit {

  @Input() private data: CharDoughnut;

  public doughnutChartType: ChartType = 'doughnut';

  constructor(){
  }

  ngOnInit() {
  }

  public get getData(): CharDoughnut{
    return this.data;
  }

}
