
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmailShortPipe } from '../pipes/emial.pipe';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        EmailShortPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ]
})
export class SharedModule{}