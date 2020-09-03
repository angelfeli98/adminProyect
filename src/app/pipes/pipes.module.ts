
import { NgModule } from '@angular/core';
import { EmailShortPipe } from './emial.pipe';
import { SafeImgPipe } from './safeImg.pipe';

@NgModule({
    declarations: [
        EmailShortPipe,
        SafeImgPipe
    ],
    exports: [
        EmailShortPipe,
        SafeImgPipe
    ]
})export class PipesModule{}