
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

// components
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { CharOneComponent } from './char-one/char-one.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        DashBoardComponent,
        ProgressComponent,
        CharOneComponent,
        PagesComponent
    ],
    imports:[
        CommonModule,
        AppRoutingModule,
        SharedModule
    ],
    exports:[
        DashBoardComponent,
        ProgressComponent,
        CharOneComponent,
        PagesComponent
    ]
})
export class PagesModule{}