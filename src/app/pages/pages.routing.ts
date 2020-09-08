
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guards
import { UserGuard } from '../guards/user.guard';

//Components
import { PagesComponent } from './pages.component';



const PAGES_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canLoad: [ UserGuard ],
        canActivate: [ UserGuard ],
        loadChildren: (): Promise<any> => import('./childRoutes.module').then( module => module.ChilRoutesModule ),
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