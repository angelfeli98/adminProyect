
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { HospitalModel } from '../models/hospital.model';
import { DoctorModel } from '../models/doctor.model';

@Injectable({
    providedIn: 'root'
})
export class CollectionService{

    private url: string;
    private results: Subject<{users: UserModel[], hospitals: HospitalModel[], doctors: DoctorModel[]}>;

    constructor(
        private http: HttpClient
    ){
        this.url = environment.url;
        this.results = new Subject<{users: UserModel[], hospitals: HospitalModel[], doctors: DoctorModel[]}>();
    }

    public getCollectionByName = (collection: 'user' | 'doctor' | 'hospital', field: string, page: number = 1, limit: number = 5): Observable<any> => {
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': localStorage.getItem('token')});
        return this.http.get(`${this.url}/search/inCollection/${collection}/${field}?limit=${limit}&page=${page}`, {headers});
    }

    public getByField = (field: string): Observable<any> => {
        if(field.length == 0){
            this.results.next(null);
            return of(null);
        }
        const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-token': localStorage.getItem('token')});
        return this.http.get(`${this.url}/search/inAll/${field}`, {headers})
                        .pipe( map((res: any) => {
                            const {user, doctor, hospital} = res.result;
                            return {
                                users: user.map( (user: any) => {
                                    const nUser = new UserModel('', '', '');
                                    nUser.setData = user;
                                    return nUser;
                                }),
                                hospitals: hospital.map((hospital: any) => new HospitalModel(hospital)),
                                doctors: doctor.map((doctor: any) => new DoctorModel(doctor))
                            }
                        }),
                            tap( res => this.results.next(res))
                        );
    }

    public get getResults(): Observable<{users: UserModel[], hospitals: HospitalModel[], doctors: DoctorModel[]}>{
        return this.results.asObservable();
    }
}