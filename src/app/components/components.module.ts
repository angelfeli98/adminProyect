
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { CharDoughnutComponent } from './char-doughnut/char-doughnut.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        CounterComponent,
        CharDoughnutComponent
    ],
    imports: [
        CommonModule,
        ChartsModule
    ],
    exports: [
        CounterComponent,
        CharDoughnutComponent
    ]
})
export class ComponentModule{}