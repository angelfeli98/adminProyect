
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/components.module';

// components
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { CharOneComponent } from './char-one/char-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations: [
        DashBoardComponent,
        ProgressComponent,
        CharOneComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent
    ],
    imports:[
        CommonModule,
        AppRoutingModule,
        SharedModule,
        ComponentModule
    ],
    exports:[
        DashBoardComponent,
        ProgressComponent,
        CharOneComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent
    ]
})
export class PagesModule{}