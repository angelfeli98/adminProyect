
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emailS',
})
export class EmailShortPipe implements PipeTransform{

    constructor(){}

    transform(email: string): string{
        if(email.length > 20)
            return email.split('@')[0];
        return email;
    }
}