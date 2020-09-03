
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AlertService{

    constructor(){}

    public makeNotification = (title: string, icon: SweetAlertIcon, text: string): void => {
        Swal.fire({
            title,
            icon,
            text
        })
    }

    public makeQustion = (text: string): Promise<SweetAlertResult> => {
        return Swal.fire({
            title: 'Are you sure?',
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure!'
        })
    }
}