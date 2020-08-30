import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FormValidators } from '../../validators/form.validators';
import { UserService } from '../../service/user.service';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private form: FormGroup;
  private isSubmited: boolean;

  constructor(
    private formValid: FormValidators,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ){
    this.isSubmited = false;
    this.makeForm();
  }

  private makeForm = (): void =>{
    this.form = this.fb.group({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.+_]+@+[a-zA-Z]+\.[a-z]{2,3}$')
        ]
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ),
      password2: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ),
      agree: new FormControl(
        false,
        Validators.requiredTrue
      )
    },{
      validators: this.formValid.samePasswords('password', 'password2')
    }
    )
  }

  public get getForm(): FormGroup{
    return this.form;
  }

  ngOnInit(): void {
  }

  public onSubmit = (): void =>{
    this.isSubmited = true;
    const { password2, agree, ...object } = this.form.value;
    if(this.form.valid){
      this.userService.createUser(object)
                      .subscribe(res => {
                        this.router.navigateByUrl('/dashboard');
                      }, error => this.alert.makeNotification('Ops...', 'error', error.error.error.message));
    }
  }

  public get isInvalidName(): boolean{
    const name = this.form.get('name');
    return ((name.touched || this.isSubmited) && name.invalid);
  }

  public get isInvalidEmail(): boolean{
    const email = this.form.get('email');
    return ((email.touched || this.isSubmited) && email.invalid);
  }

  public get isInvalidPassword(): boolean{
    const password = this.form.get('password');
    return ((password.touched || this.isSubmited) && password.invalid);
  }

  public get isInvalidPassword2(): boolean{
    const password = this.form.get('password2');
    return ((password.touched || this.isSubmited) && (password.invalid || this.form.errors?.notMatch));
  }

  public get isSamePasswords(): boolean{
    const password = this.form.get('password');
    const password2 = this.form.get('password2');
    return (((password2.touched && password2.value.length > 0) || this.isSubmited) && (password.value != password2.value));
  }

  public get isNotPassword2(): boolean{
    const password = this.form.get('password2');
    return ((password.touched || this.isSubmited) && (password.value.length == 0));
  }

  public get isInvalidAgree(): boolean{
    const agree = this.form.get('agree');
    return ((agree.touched || this.isSubmited) && agree.invalid);
  }
}
