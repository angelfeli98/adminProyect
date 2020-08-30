
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// Components
import { NotfoundComponent } from './notfound/notfound.component';


const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    { path: '**', pathMatch: 'full', component: NotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES),
        PagesRoutingModule,
        AuthRoutingModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}