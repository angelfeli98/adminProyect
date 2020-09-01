import { Pipe, PipeTransform, Sanitizer, ɵbypassSanitizationTrustResourceUrl, ɵSafeResourceUrl } from '@angular/core';

@Pipe({
    name: 'safeImg',
    pure: false
})
export class SafeImgPipe implements PipeTransform{

    constructor(){}

    transform(data: string): ɵSafeResourceUrl{
        const sani: ɵSafeResourceUrl = ɵbypassSanitizationTrustResourceUrl(data);
        return sani;
    }
}