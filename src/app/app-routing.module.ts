
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { DashBoardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { CharOneComponent } from './pages/char-one/char-one.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PagesComponent } from './pages/pages.component';

const APP_ROUTES: Routes = [
    {   path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashBoardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'charOne', component: CharOneComponent },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', pathMatch: 'full', component: NotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}