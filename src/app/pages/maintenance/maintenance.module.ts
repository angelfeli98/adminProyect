
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ComponentModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { UserInfoComponent } from './doctors/user-info.component';

@NgModule({
    declarations: [
        UserComponent,
        HospitalsComponent,
        DoctorsComponent,
        UserInfoComponent
    ],
    imports: [
        CommonModule,
        ComponentModule,
        PipesModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        UserComponent,
        HospitalsComponent,
        DoctorsComponent,
        UserInfoComponent
    ]
})
export class MaintenanceModule{
}