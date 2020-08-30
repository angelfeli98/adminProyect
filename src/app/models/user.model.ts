
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
}