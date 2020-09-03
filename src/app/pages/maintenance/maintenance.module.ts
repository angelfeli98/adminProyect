
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ComponentModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        UserComponent,
        HospitalsComponent,
        DoctorsComponent
    ],
    imports: [
        CommonModule,
        ComponentModule,
        PipesModule
    ],
    exports: [
        UserComponent,
        HospitalsComponent,
        DoctorsComponent
    ]
})
export class MaintenanceModule{
}