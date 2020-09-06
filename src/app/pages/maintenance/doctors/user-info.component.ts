import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HospitalModel } from '../../../models/hospital.model';
import { DoctorModel } from '../../../models/doctor.model';
import { HospitalService } from 'src/app/service/hospital.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: [
  ]
})
export class UserInfoComponent implements OnInit {

  private new: boolean;
  private form: FormGroup;
  private submited: boolean;
  private hospitals: HospitalModel[];
  private doctor: DoctorModel;
  public loading: boolean;

  constructor(
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private router: Router,
    private doctorService: DoctorService,
    private alert: AlertService
  ){
    this.new = this.active.snapshot.params.id == 'new';
    this.submited = false;
    this.hospitals = [];
    this.makeForm();
    this.hospitalService.getHospitals
                        .subscribe(hospitals => {
                          this.hospitals = hospitals
                          this.form.get('hospital').patchValue(this.hospitals[0].id);
                        });
    if(!!!this.new)
        this.doctorService.getDoctorById(this.active.snapshot.params.id)
                          .subscribe( doctor => {
                            this.doctor = doctor;
                            this.form.get('name').patchValue(this.doctor.name);
                            this.form.get('hospital').patchValue(this.doctor.hospital.id);
                          }, err => router.navigateByUrl('/dashboard/doctors'));
  }

  ngOnInit(): void {
  }

  private makeForm = (): void => {
    this.form = this.fb.group({
      'name': new FormControl('', Validators.required),
      'hospital': new FormControl('')
    })
  }

  public onSubmit = (): Subscription => {
    this.submited = true;
    if(this.form.valid)
      if(this.new)
        return this.doctorService.saveDoctor(this.form.value)
                          .subscribe( doctor => {
                            this.new = false;
                            this.router.navigateByUrl(`/dashboard/doctor-info/${doctor.id}`);
                          })
      return this.doctorService.updateDoctor(this.form.value, this.doctor.id)
                              .subscribe( res => this.alert.makeNotification('Success', 'success', 'Doctor updated'));
  }

  public get isInvalidName(): boolean{
    const name = this.form.get('name');
    return ((this.submited || name.touched) && name.invalid);
  }

  public get getHospitalImg(): string{
    const hospital = this.form.get('hospital') || { value: ''};
    return this.hospitals.find( hospitalA => hospitalA.id == hospital.value )?.img || ''
  }

  public get getNew(): boolean{
    return this.new;
  }

  public get getForm(): FormGroup{
    return this.form;
  }

  public get getHospitals(): HospitalModel[]{
    return this.hospitals;
  }

  public get getDoctor(): DoctorModel{
    return this.doctor;
  }
}
