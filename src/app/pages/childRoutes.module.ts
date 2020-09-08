
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { CharOneComponent } from './char-one/char-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './maintenance/user/user.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { UserInfoComponent } from './maintenance/doctors/user-info.component';
import { SearchAllComponent } from './search-all/search-all.component';

const CHILDROUTES: Routes = [
    { path: '', pathMatch:'full', component: DashBoardComponent, data: { title: 'Dashboard' } },
    { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
    { path: 'charOne', component: CharOneComponent, data: { title: 'Chars' } },
    { path: 'accountSettings', component: AccountSettingsComponent, data: { title: 'Account service' } },
    { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' }},
    //maintenance
    { path: 'users', component: UserComponent, data: {title: 'Users maintenance'}, canActivate: [AdminGuard]},
    { path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals maintenance'}},
    { path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors maintenance'}},
    { path: 'doctor-info/:id', component: UserInfoComponent, data: {title: 'Doctor Info' } },
    { path: 'search', component: SearchAllComponent, data: {title: 'Search'} }
]

@NgModule({
    imports: [
        RouterModule.forChild(CHILDROUTES)
    ],
    exports: [
        RouterModule
    ],
})
export class ChilRoutesModule{}