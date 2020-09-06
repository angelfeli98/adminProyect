
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DoctorModel } from '../models/doctor.model';

@Injectable({
    providedIn: 'root'
})
export class DoctorService{

    private url: string;

    constructor(
        private http: HttpClient
    ){
        this.url = environment.url;
    }

    public getDoctors = (page: number = 1): Observable<any> => {
        const limit = 5;
        return this.http.get(`${this.url}/doctor/getDoctors?page=${page}&limit=${limit}`, {headers: this.getHeaders})
                        .pipe( map( (results: any) => ({doctors: results.doctors.map( (doctor: any) => new DoctorModel(doctor)), results: results.total})));
    }

    public getDoctorById = (id: string): Observable<DoctorModel> => {
        return this.http.get(`${this.url}/doctor/getById/${id}`, {headers: this.getHeaders})
                .pipe( map( (res: any) => new DoctorModel(res.doctor)))
    }

    public saveDoctor = (data: Object): Observable<DoctorModel> => {
        const body = this.makeBody(data);
        return this.http.post(`${this.url}/doctor/save`, body, {headers: this.getHeaders})
                        .pipe( map( (res: any) => new DoctorModel(res.savedDoctor)));
    }

    public updateDoctor = (data: Object, id: string): Observable<any> => {
        const body = this.makeBody(data);
        return this.http.put(`${this.url}/doctor/update/${id}`, body, {headers: this.getHeaders})
                        .pipe( map((res: any) => new DoctorModel(res.updatedDoctor)));
    }

    public deleteDoctor = (id: string): Observable<any> => {
        return this.http.delete(`${this.url}/doctor/delete/${id}`, {headers: this.getHeaders});
    }

    private get getHeaders(): HttpHeaders{
        return new HttpHeaders({'Content-Type': 'application/json', 'x-token': localStorage.getItem('token')});
    }

    private makeBody = (data: Object): string => {
        return JSON.stringify(data);
    }
}