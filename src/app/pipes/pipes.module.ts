
import { NgModule } from '@angular/core';
import { EmailShortPipe } from './emial.pipe';
import { SafeImgPipe } from './safeImg.pipe';
import { ImgPipe } from './image.pipe';

@NgModule({
    declarations: [
        EmailShortPipe,
        SafeImgPipe,
        ImgPipe
    ],
    exports: [
        EmailShortPipe,
        SafeImgPipe,
        ImgPipe
    ]
})export class PipesModule{}