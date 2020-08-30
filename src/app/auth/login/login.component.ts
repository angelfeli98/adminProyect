import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/registerForm.interface';
import { UserService } from '../../service/user.service';
import { AlertService } from '../../service/alert.service';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  private formGetPassword: FormGroup;
  private submitedForm: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alert: AlertService,
    private ngZone: NgZone
  ){
    this.makeForm();
  }

  ngOnInit(): void {
    this.renderButton();
  }

  private makeForm = (): void =>{
    this.form = this.fb.group({
      'email': new FormControl(localStorage.getItem('email') || '', Validators.required),
      'password': new FormControl('', Validators.required),
      'rememberMe': new FormControl(localStorage.getItem('email'))
    })

    this.formGetPassword = this.fb.group({
      email: new FormControl('', Validators.required)
    })
  }

  public onSubmit = (): void => {
    this.submitedForm = true;
    const { email, password, rememberMe } = this.form.value;
    if(this.form.valid){
      if(rememberMe)
        localStorage.setItem('email', email);
      else
        localStorage.removeItem('email');
      this.userService.loginUser({email, password})
                      .subscribe(res => {
                        this.router.navigateByUrl('dashboard');
                      }, error => this.alert.makeNotification('Ops...', 'error', error.error.error.message))
    }
  }

  private onSuccess = (googleUser: any): void => {
    const googleToken = googleUser.getAuthResponse().id_token;
    this.userService.googleLoging(googleToken)
                    .subscribe(response => this.ngZone.run(() =>  this.router.navigateByUrl('/dashboard')),
                                error => this.ngZone.run( () => this.alert.makeNotification('Ops...', 'error', error.error.error.message)));
  }
  private onFailure = (error: any): void => {
    console.log(error);
  }

  public renderButton = (): void => {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure,
    });
  }

  public get invalidUser(): boolean{
    const user = this.form.get('email');
    return ((user.touched || this.submitedForm) && user.invalid);
  }

  public get invalidPassword(): boolean{
    const password = this.form.get('password');
    return ((password.touched || this.submitedForm) && password.invalid)
  }

  public get getForm(): FormGroup{
    return this.form;
  }

  public get getFormGetPassword(): FormGroup{
    return this.formGetPassword;
  }

}
