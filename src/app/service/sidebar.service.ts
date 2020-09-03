
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebatService{

    private menu: any[];

    constructor(){
        this.menu = [
            {
                title: 'Home',
                icon: 'mdi mdi-gauge',
                submenu: [
                    {
                        title: 'Progress',
                        url: 'progress'
                    },
                    {
                        title: 'Chars',
                        url: 'charOne'
                    },
                    {
                        title: 'Promises',
                        url: 'promises'
                    },
                    {
                        title: 'Rxjs',
                        url: 'rxjs'
                    }
                ]
            },
            {
                title: 'Settings',
                icon: 'mdi mdi-folder-lock-open',
                submenu: [
                    {
                        title: 'Users',
                        url: 'users'
                    },
                    {
                        title: 'Doctors',
                        url: 'doctors'
                    },
                    {
                        title: 'Hospital',
                        url: 'hospitals'
                    }
                ]
            }
        ]
    }

    public get getMenu(): any[]{
        return this.menu;
    }
}