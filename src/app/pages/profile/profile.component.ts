import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';
import { AlertService } from '../../service/alert.service';
import { FileService } from '../../service/file.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private form: FormGroup;
  private user: UserModel;
  private sumbited: boolean;
  private newPhoto: any;
  private formImage: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private alert: AlertService,
    private fileService: FileService
  ){
    this.sumbited = false;
    this.user = this.userService.user;
    this.makeForms();
  }

  private makeForms = (): void => {
    this.form = this.fb.group({
      'name': new FormControl(this.user.name, Validators.required),
      'email': new FormControl({'value': this.user.email, 'disabled': this.user.google}, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    })

    this.formImage = this.fb.group({
      'file': new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  public onSubmit = (): void => {
    this.sumbited = true;
    if(this.form.valid && this.form.touched)
      this.userService.updateUser(this.form.value)
                      .subscribe( res => this.alert.makeNotification('Success', 'success', 'The data has been updated') , err => this.alert.makeNotification('Ops...', 'error', 'Somethis is bad'))
  }

  public changeValues = (): void => {
    this.form.setValue({
      name: this.user.name,
      email: this.user.email
    })
  }

  public set resetImage(value: any){
    this.newPhoto = value;
  }

  public changePhoto = async(files: FileList): Promise<void> => {
    if(!!!files.item(0))
      return null;
    const image = files.item(0);
    const data = image.slice(0);
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = (): void => {
      const result = reader.result;
      this.newPhoto = result;
    }
  }

  public submitImage = (files: FileList): void => {
    if(this.formImage.valid){
      const newPhoto = files.item(0)
      this.fileService.uploadImge(newPhoto, 'user', this.user.id)
                      .subscribe( res => this.alert.makeNotification('Success', 'success', 'Your image has been updated'),
                                  error => console.log(error)
                      )
    }
  }

  public get getFormData(): FormGroup{
    return this.form;
  }

  public get getUser(): UserModel{
    return this.user;
  }

  public get invalidUser(): boolean{
    const user = this.form.get('name');
    return ((user.touched || this.sumbited) && user.invalid);
  }

  public get invalidEmail(): boolean{
    const email = this.form.get('email');
    return ((email.touched || this.sumbited) && email.invalid);
  }

  public get getImage(): string{
    return this.newPhoto || this.user.getImg;
  }

  public get getFormImage(): FormGroup{
    return this.formImage;
  }
}
