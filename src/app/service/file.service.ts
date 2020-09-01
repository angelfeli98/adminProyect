
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class FileService{

    private url: string;
    private user: UserModel;

    constructor(
        private http: HttpClient,
        private userService: UserService
    ){
        this.url = environment.url;
        this.user = this.userService.user;
    }

    public uploadImge = (file: File, collection: 'user' | 'doctor' | 'hospital', id: string): Observable<any> => {
        if(!!!file.type.includes('image'))
            return of();
        const body = new FormData();
        body.append('file', file, file.name);
        const headers = new HttpHeaders({'x-token': localStorage.getItem('token')});
        return this.http.post(`${this.url}/file/upload/${collection}/${id}`, body, {headers})
                        .pipe( tap(res => (collection == 'user')?this.user.setData = res.result: '') )
    }

    private makeBody = (data: Object): string =>  JSON.stringify(data);
}