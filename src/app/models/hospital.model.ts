
import { environment } from '../../environments/environment';
import { UserModel } from './user.model';

const url: string = environment.url;

export class HospitalModel{
    public img: string;
    public name: string;
    public doctors: any[];
    public madeBy: UserModel;
    public id: string;

    constructor({
        img,
        name,
        doctors,
        madeBy,
        id })
        {
        this.img = img || '';
        this.name = name || '';
        this.doctors = doctors || '';
        this.madeBy = new UserModel('', '', '');
        this.madeBy.setData = madeBy || '';
        this.id = id || '';
    }

    public get getData (): Object{
        return {
            img: this.img,
            name: this.name,
            madeBy: this.madeBy.id,
            id: this.id
        }
    }
}