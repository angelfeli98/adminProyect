
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { CharDoughnutComponent } from './char-doughnut/char-doughnut.component';

import { ChartsModule } from 'ng2-charts';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { SafeImgPipe } from '../pipes/safeImg.pipe';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        CounterComponent,
        CharDoughnutComponent,
        ImageModalComponent,
    ],
    imports: [
        CommonModule,
        ChartsModule,
        PipesModule
    ],
    exports: [
        CounterComponent,
        CharDoughnutComponent,
        ImageModalComponent,
    ]
})
export class ComponentModule{}