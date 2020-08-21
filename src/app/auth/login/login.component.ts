import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  private formGetPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.makeForm();
  }

  ngOnInit(): void {
  }

  private makeForm = (): void =>{
    this.form = this.fb.group({
      'user': ['', Validators.required],
      'password': ['', Validators.required]
    })

    this.formGetPassword = this.fb.group({
      email: ['', Validators.required]
    })
  }

  public onSubmit = (): void =>{
    this.router.navigateByUrl('dashboard');
  }

  public get getForm(): FormGroup{
    return this.form;
  }

  public get getFormGetPassword(): FormGroup{
    return this.formGetPassword;
  }

}
