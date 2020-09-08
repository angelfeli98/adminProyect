
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../interfaces/registerForm.interface';
import { environment } from '../../environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class UserService{

    private url: string;
    public user: UserModel;

    constructor(
        private http: HttpClient,
        private router: Router,
        private ngZone: NgZone
    ){
        this.url = environment.url;
        this.user = new UserModel('', '', '');
    }

    public validateToken = (): Observable<boolean> => {
        const token = localStorage.getItem('token');
        if(!!!token)
            return of(false);
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': token})
        return this.http.post(`${this.url}/auth/newToken`,{},{headers})
                        .pipe(
                            tap((res: any) => localStorage.setItem('menu', JSON.stringify(res.menu))),
                            map( response =>{
                            localStorage.setItem('token', response['token']);
                            this.user.setData = response['user'];
                            return true;
                        }));
    }

    public signOut = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        this.signOutGoogle();
    }

    public signOutGoogle = (): void => {
        const google = this.user.google;
        this.user = undefined;
        if(google && gapi.auth2){
            const auth2 = gapi.auth2.getAuthInstance();
            if(auth2)
                auth2.signOut().then((): void => {
                    this.ngZone.run(() => {this.router.navigateByUrl('/login')})
                });
        }else
            this.router.navigateByUrl('/login')
    }

    public createUser = (data: Register): Observable<any> => {
        const body = this.makeBody(data);
        const headers = this.makeHeaders();
        this.user = new UserModel('', '', '');
        return this.http.post(`${this.url}/user/saveUser`, body, {headers})
                        .pipe( tap( response => localStorage.setItem('token', response['token'])));
    }

    public loginUser = (data: Register): Observable<any> => {
        const body = this.makeBody(data);
        const headers = this.makeHeaders();
        this.user = new UserModel('', '', '');
        return this.http.post(`${this.url}/auth/login`, body, {headers})
                        .pipe(
                            tap((res: any) => localStorage.setItem('menu', JSON.stringify(res.menu))),
                            map(response => localStorage.setItem('token', response['token'])))
    }

    public googleLoging = (token: string): Observable<any> => {
        this.user = new UserModel('', '', '');
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'g-token': token})
        return this.http.post(`${this.url}/auth/loginGoogle`, {}, {headers})
                        .pipe(
                            tap((res: any) => localStorage.setItem('menu', JSON.stringify(res.menu))),
                            map(response => localStorage.setItem('token', response['token'])));
    }

    public updateUser = (data: Object, self: boolean = true, id?: string): Observable<any> => {
        const body = this.makeBody(data);
        const ids = self?this.user.id:id;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': token});
        return this.http.put(`${this.url}/user/updateUser/${ids}`, body, {headers})
                        .pipe( tap(response => self?this.user.setData = response['updatedUser']: ''));
    }

    private makeBody = (data: Object): string => {
        return JSON.stringify(data);
    }

    private makeHeaders = (): HttpHeaders => {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    public getUsers = (page: number = 1, limit: number = 5): Observable<{users: UserModel[], results: number}> => {
        const token = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': token})
        return this.http.get(`${this.url}/user/getUsers?page=${page}&limit=${limit}`, {headers})
                        .pipe( map( response => {
                            const results  = response['results'];
                            const users = response['users'].map( (user: any) => {
                                const userM = new UserModel('', '', '');
                                userM.setData = user;
                                return userM
                            })
                            return { users, results };
                        }))
    }

    public deleteUser = (id: string): Observable<any> => {
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': localStorage.getItem('token')})
        return this.http.delete(`${this.url}/user/deleteUser/${id}`, {headers});
    }
}