
import { environment } from '../../environments/environment';

const url = environment.url;
export class UserModel{

    public name: string;
    public email: string;
    public password: string;
    public img: string;
    public role: string;
    public id: string;
    public google: boolean;

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public set setData({name, email, role, id, img, google}: any){
        this.name = name;
        this.email = email;
        this.google = google,
        this.img = img;
        this.id = id;
        this.role = role;
    }

    public get getImg(): string{
        const pattern = new RegExp('https');
        const pattern2 = new RegExp('data');
        if(pattern.test(this.img))
            return this.img;
        else if(this.img)
            return `${url}/file/load/user/${this.img}`;
        else if(pattern2.test(this.img))
            return this.img;
        return `${url}/file/load/user/no-img.jpg`;
    }

    public get getRole(): string{
        const pattern = new RegExp('USER');
        if(pattern.test(this.role))
            return 'User';
        return 'ADMIN';
    }

    public get getData(): Object{
        return {
            name: this.name,
            email: this.email,
            google: this.google,
            role: this.role,
            img: this.img,
        }
    }
}