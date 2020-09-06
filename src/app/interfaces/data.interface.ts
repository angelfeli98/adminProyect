import { UserModel } from '../models/user.model';
import { HospitalModel } from '../models/hospital.model';
import { DoctorModel } from '../models/doctor.model';

export interface Data{
    show: boolean,
    user?: UserModel | HospitalModel | DoctorModel,
    type?: any,
}