
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
}