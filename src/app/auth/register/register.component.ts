import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.makeForm();
  }

  private makeForm = (): void =>{
    this.form = this.fb.group({
      name: ['name', Validators.required]
    })
  }

  public get getForm(): FormGroup{
    return this.form;
  }

  ngOnInit(): void {
  }

}
