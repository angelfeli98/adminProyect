
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidators{

    constructor(){}

    public samePasswords = (field1: string, field2: string): Function => {
        return (form: FormGroup): Error => {
            const match = ((form.get(field1).value || '')== form.get(field2).value || '');
            if(!!!match)
                return {
                    'notMatch': true
                }
            return null
        }
    }
}

interface Error{
    [s: string]: boolean
}