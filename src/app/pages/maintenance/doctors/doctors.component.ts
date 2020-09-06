import { Component, OnInit } from '@angular/core';

import { DoctorService } from '../../../service/doctor.service';
import { DoctorModel } from '../../../models/doctor.model';
import { ModalImgService } from '../../../service/modal.service';
import { Data } from '../../../interfaces/data.interface';
import { CollectionService } from '../../../service/collections.service';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  private doctors: DoctorModel[];
  private dataModal: Data;
  public page: number;
  public loading: boolean;
  public results: number;

  constructor(
    private doctorService: DoctorService,
    private modalImg: ModalImgService,
    private search: CollectionService,
    private aler: AlertService
    ){
    this.loading = false;
    this.page = 1;
    this.loadUsers();
    this.dataModal = this.modalImg.getData;
  }

  private loadUsers = (): void => {
    this.loading = true;
    this.doctorService.getDoctors(this.page)
                      .subscribe( ({doctors, results}) => {
                        this.doctors = doctors;
                        this.results = results;
                        this.loading = false;
                      });
  }

  ngOnInit(): void {
  }

  public openModal = (doctor: DoctorModel): void => {
    this.dataModal.show = true;
    this.dataModal.type = 'doctor';
    this.dataModal.user = doctor;
  }

  public searchDoctor = (field: string): void => {
    if(field.length == 0)
      return this.loadUsers();
    this.loading = true;
    this.search.getCollectionByName('doctor', field, 1, 20)
                .subscribe( (res: any) => {
                  this.doctors = res.results.map( doctor => new DoctorModel(doctor))
                  this.loading = false;
                })
  }

  public deleteDoctor = async(id: string, index: number): Promise<any> => {
    const res = await this.aler.makeQustion(`You are going to delete the doctor`);
    if(res.value)
      this.doctorService.deleteDoctor(id)
                        .subscribe( res => {
                          this.doctors.splice(index, 1);
                          this.aler.makeNotification('Sucess', 'success', 'The doctor has been deleted');
                        })
  }

  public pageDoctors = (next: boolean): void => {
    next?this.page++:this.page--;
    this.loadUsers();
  }

  public get getDoctors(): DoctorModel[]{
    return this.doctors;
  }

}
