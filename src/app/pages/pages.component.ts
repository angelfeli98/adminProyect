import { Component, OnInit } from '@angular/core';
import { customInitFunction } from '../../assets/js/custom.js';

declare function customInitFunction(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customInitFunction();
  }

}
