
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
        const pattern = new RegExp('https')
        if(pattern.test(this.img))
            return this.img;
        else if(this.img)
            return `${url}/file/load/user/${this.img}`;
        return `${url}/file/load/user/no-img.jpg`;
    }
}