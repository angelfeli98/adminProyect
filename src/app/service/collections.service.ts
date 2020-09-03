
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollectionService{

    private url: string;

    constructor(
        private http: HttpClient
    ){
        this.url = environment.url;
    }

    public getCollectionByName = (collection: 'user' | 'doctor' | 'hospital', field: string, page: number = 1, limit: number = 5): Observable<any> => {
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': localStorage.getItem('token')});
        return this.http.get(`${this.url}/search/inCollection/${collection}/${field}?limit=${limit}&page=${page}`, {headers});
    }
}