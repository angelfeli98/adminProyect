
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
    name: 'img'
})
export class ImgPipe implements PipeTransform{

    private url: string;

    constructor(){
        this.url = environment.url;
    }

    transform(img: string = '', collection: 'user' | 'hospital' | 'doctor'): string{
        if(img == null || img == undefined || img.length == 0 )
            return `${this.url}/file/load/${collection}/no-img.jpg`;

        const pattern = new RegExp('https');
        const pattern2 = new RegExp('data');
        if(pattern.test(img))
            return img;
        else if(pattern2.test(img))
            return img;
        else
            return `${this.url}/file/load/${collection}/${img}`;
    }
}