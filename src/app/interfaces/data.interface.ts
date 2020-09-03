import { UserModel } from '../models/user.model';

export interface Data{
    show: boolean,
    user?: UserModel,
    type?: 'user' | 'hospital' | 'doctor',
}