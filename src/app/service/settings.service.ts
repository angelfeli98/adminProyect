
import { Injectable, Renderer2} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService{

    private theme: string;
    private themeElement: Element;

    constructor(){
        this.themeElement = document.getElementById('theme');
        this.theme = localStorage.getItem('theme') || 'default';
        this.changeTheme(this.theme);
    }

    public changeTheme = (newTheme: string): void =>{
        this.themeElement.setAttribute('href', `./assets/css/colors/${newTheme}.css`);
        localStorage.setItem('theme', newTheme);
    }

    public get getTheme(): string{
        return this.theme;
    }
}