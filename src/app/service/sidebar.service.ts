
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
            }
        ]
    }

    public get getMenu(): any[]{
        return this.menu;
    }
}