
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HospitalModel } from '../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HospitalService{

    private url: string;

    constructor(
        private http: HttpClient
    ){
        this.url = environment.url
    }

    public get getHospitals(): Observable<HospitalModel[]>{
        return this.http.get(`${this.url}/hospital/getHospitals`, {headers: this.getNewHeader})
                        .pipe( map( (res: any) => res.hospitals.map( (hospital: any) => new HospitalModel(hospital))))
    }

    public updateHospital = (data: Object, id: string): Observable<any> => {
        const body = this.makeBody(data);
        return this.http.put(`${this.url}/hospital/update/${id}`, body, {headers: this.getNewHeader})
                        .pipe( map( (res: any) => new HospitalModel(res.updatedHospital)));
    }
    public deleteHospital = (id: string): Observable<any> => {
        return this.http.delete(`${this.url}/hospital/delete/${id}`, {headers: this.getNewHeader})
                        .pipe( map((res: any) => new HospitalModel(res.deletedHospital)))
    }

    public saveHospital = (data: Object): Observable<any> => {
        const body = this.makeBody(data);
        return this.http.post(`${this.url}/hospital/saveHospital`, body, {headers: this.getNewHeader})
                        .pipe( map( (res: any) => new HospitalModel(res.savedHospital) ) )
    }

    private makeBody = (data: Object): string => {
        return JSON.stringify(data);
    }

    private get getNewHeader(): HttpHeaders{
        return new HttpHeaders({'Content-Type': 'application/json', 'x-token': localStorage.getItem('token')});
    }

}

