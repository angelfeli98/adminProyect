
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SidebatService{

    private menu: any[];
    private url: string;

    constructor(
        private http: HttpClient
    ){
        this.url = environment.url;
    }

    public get getMenu(): any[]{
        return JSON.parse(localStorage.getItem('menu'));
    }
}