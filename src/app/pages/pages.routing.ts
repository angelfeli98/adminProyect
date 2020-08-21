
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Components
import { PagesComponent } from './pages.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { CharOneComponent } from './char-one/char-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const PAGES_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', pathMatch:'full', component: DashBoardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'charOne', component: CharOneComponent },
            { path: 'accountSettings', component: AccountSettingsComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(PAGES_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule{}