import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  tab: number = 1;
  loginForm: FormGroup;
  loginForm2: FormGroup;
  submitted = false;
  check = false;
  temp: string = '';
  temp2: string = '';
  tempLogin: string = '';
  dataLogin: Login[] = [];
  objLogin: Login[] = [];

  constructor(private FormBuilder: FormBuilder){
    this.loginForm = FormBuilder.group({});
    this.loginForm2 = FormBuilder.group({});
    
    if(localStorage.getItem('dataLogin') == null){
      this.dataLogin = [];
    }
    else{
      this.tempLogin = localStorage.getItem('dataLogin') || '';
      this.dataLogin = JSON.parse(this.tempLogin);
    }
  }

  ngOnInit(): void{
    this.loginForm = this.FormBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.loginForm2 = this.FormBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      username: ['',[Validators.required, Validators.minLength(3)]]
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  get fu(){
    return this.loginForm2.controls;
  }

  onSubmit(this:any){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }
    else{
      this.temp = (<HTMLInputElement>document.getElementById("iEmail")).value;
      this.temp2 = (<HTMLInputElement>document.getElementById("iPassword")).value;
      
      let valid = 3;
      for(let data of this.dataLogin){
        if(data.email != this.temp && data.password != this.temp2){
          valid = 0;
        }
        else if(data.email != this.temp){
          valid = 1;
        }
        else if(data.password != this.temp2){
          valid = 2;
        }
        else{
          sessionStorage.setItem('username',data.username);
          document.location='http://localhost:4200/';
        }
      }
      if(valid == 0){
        alert("Wrong Email and Password");
      }
      else if(valid == 1){
        alert("Wrong Email");
      }
      else if(valid == 2){
        alert("Wrong Password");
      }
      return;
    }
  }

  onSubmit2(){
    this.submitted = true;
    
    if(this.loginForm2.invalid){
      return;
    }
    else{
      if(localStorage.getItem('dataLogin') == null){
        this.objLogin = [];
      }
      else{
        this.tempLogin = localStorage.getItem('dataLogin') || '';
        this.objLogin = JSON.parse(this.tempLogin);
      }
      this.objLogin.push(new Login(this.loginForm2.controls['fname'].value, this.loginForm2.controls['lname'].value, this.loginForm2.controls['username'].value,
                                   this.loginForm2.controls['email'].value, this.loginForm2.controls['password'].value));
      this.tempLogin = JSON.stringify(this.objLogin);

      localStorage.setItem('dataLogin',this.tempLogin);
      alert('Registration Data Has Been Saved');
      this.tab = 1;
    }
  }
}
