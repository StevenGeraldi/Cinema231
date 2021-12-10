export class Login{
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;

    constructor(Tfname: string,Tlname: string, Tusername:string, Temail:string, Tpassword: string){
        this.fname = Tfname;
        this.lname = Tlname;
        this.username = Tusername;
        this.email = Temail;
        this.password = Tpassword;
    }
}