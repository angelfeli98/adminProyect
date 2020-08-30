
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../interfaces/registerForm.interface';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class UserService{

    private url: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private ngZone: NgZone
    ){
        this.url = environment.url;
    }

    public validateToken = (): Observable<boolean> => {
        const token = localStorage.getItem('token');
        if(!!!token)
            return of(false);
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': token})
        return this.http.post(`${this.url}/auth/newToken`,{},{headers})
                        .pipe(
                            map( response =>{
                            localStorage.setItem('token', response['token']);
                            return true;
                        }));
    }

    public signOut = (): void => {
        localStorage.removeItem('token');
        this.signOutGoogle();
    }

    public signOutGoogle = (): void => {
        const auth2 = gapi.auth2.getAuthInstance();
        if(auth2)
            auth2.signOut().then((): void => {
                this.ngZone.run(() => this.router.navigateByUrl('/login'))
            });
        else
        this.router.navigateByUrl('/login')
    }

    public createUser = (data: Register): Observable<any> => {
        const body = this.makeBody(data);
        const headers = this.makeHeaders();
        return this.http.post(`${this.url}/user/saveUser`, body, {headers})
                        .pipe( tap( response => localStorage.setItem('token', response['token'])));
    }

    public loginUser = (data: Register): Observable<any> => {
        const body = this.makeBody(data);
        const headers = this.makeHeaders();
        return this.http.post(`${this.url}/auth/login`, body, {headers})
                        .pipe( map(response => localStorage.setItem('token', response['token'])))
    }

    public googleLoging = (token: string): Observable<any> => {
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'g-token': token})
        return this.http.post(`${this.url}/auth/loginGoogle`, {}, {headers})
                        .pipe( map(response => localStorage.setItem('token', response['token'])));
    }

    public saveSession = (): void => {

    }

    private makeBody = (data: Object): string => {
        return JSON.stringify(data);
    }

    private makeHeaders = (): HttpHeaders => {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
}