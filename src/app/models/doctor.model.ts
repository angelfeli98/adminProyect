
import { HospitalModel } from './hospital.model';
import { UserModel } from './user.model';

export class DoctorModel{

    public name: string;
    public img: string;
    public hospital: HospitalModel;
    public madeBy: UserModel;
    public id: string;

    constructor({name, img, hospital, madeBy, id}){
        this.name = name;
        this.img = img;
        this.hospital = new HospitalModel(hospital);
        this.madeBy = new UserModel('', '', '');
        this.madeBy.setData = madeBy;
        this.id = id;
    }

    public getImg(): string{
        if(this.img.length == 0 || !!!this.img)
            return 'http://localhost:7070/file/load/doctor/no-img.jpg';
        const pattern = new RegExp('https');
        if(pattern.test(this.img))
            return this.img;
        return `http://localhost:7070/file/load/doctor/${this.img}`;
    }

    public get getData(): Object{
        return {
            name: this.name,
            img: this.img,
            hospital: this.hospital,
            madeBy: this.madeBy
        }
    }
}