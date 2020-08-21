import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { CharDoughnut } from '../../interfaces/char-dougtnut.interface';

@Component({
  selector: 'app-char-one',
  templateUrl: './char-one.component.html',
  styles: [
  ]
})
export class CharOneComponent implements OnInit {

  public dataOne: CharDoughnut;
  public dataTwo: CharDoughnut;
  public dataThree: CharDoughnut;
  public dataFour: CharDoughnut;

  constructor() {
    this.dataOne = {
      title: 'Sales',
      doughnutChartLabels: ['Label1', 'Label2', 'Label3'],
      doughnutChartData: [
        [350, 450, 100]
      ],
      colors: [
        { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
      ]
    };
    this.dataTwo = {
      title: 'Sales',
      doughnutChartLabels: ['Label1', 'Label2', 'Label3'],
      doughnutChartData: [
        [895, 254, 741]
      ],
      colors: [
        { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
      ]
    };;
    this.dataThree = {
      title: 'Sales',
      doughnutChartLabels: ['Label1', 'Label2', 'Label3'],
      doughnutChartData: [
        [147, 365, 784]
      ],
      colors: [
        { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
      ]
    };;
    this.dataFour = {
      title: 'Sales',
      doughnutChartLabels: ['Label1', 'Label2', 'Label3'],
      doughnutChartData: [
        [415, 225, 843]
      ],
      colors: [
        { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
      ]
    };;
  }

  ngOnInit() {
  }

}
