
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
                        title: 'Main',
                        url: '/'
                    },
                    {
                        title: 'Progress',
                        url: 'progress'
                    },
                    {
                        title: 'Chars',
                        url: 'charOne'
                    }
                ]
            }
        ]
    }

    public get getMenu(): any[]{
        return this.menu;
    }
}