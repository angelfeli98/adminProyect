import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { HospitalService } from '../../../service/hospital.service';
import { HospitalModel } from '../../../models/hospital.model';
import { AlertService } from '../../../service/alert.service';
import { FileService } from '../../../service/file.service';
import { CollectionService } from '../../../service/collections.service';
import { ModalImgService } from '../../../service/modal.service';
import { Data } from '../../../interfaces/data.interface';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  private hospitals: HospitalModel[];
  private loading: boolean;
  private modal: Data;

  constructor(
    private hospitalService: HospitalService,
    private alert: AlertService,
    private fileService: FileService,
    private collection: CollectionService,
    private modalImg: ModalImgService
  ){
    this.hospitals = [];
    this.loading = true;
    this.modal = this.modalImg.getData;
    this.getHospitalsInit();
  }


  ngOnInit(): void {
  }

  private getHospitalsInit = (): void => {
    this.hospitalService.getHospitals
                        .subscribe( hospitals => {
                          this.hospitals = hospitals
                          this.loading = false;
                        })

  }
  public updateHospital = (hospital: HospitalModel): void => {

  }

  public openModal = (hospital: HospitalModel): void => {
    this.modal.show = true;
    this.modal.type = 'hospital';
    this.modal.user = hospital;
  }

  public searchHospital = (field: string): void => {
    this.loading = true;
    if(field.length == 0)
      return this.getHospitalsInit();

    this.collection.getCollectionByName('hospital', field)
                    .subscribe( res => {
                      this.loading = false;
                      this.hospitals = res.results.map( (hospital: any) => new HospitalModel(hospital));
                    })
  }

  public saveChanges = (hospital: HospitalModel, name: string): void => {
    hospital.name = name;
    this.hospitalService.updateHospital(hospital.getData, hospital.id)
                        .subscribe(res => this.alert.makeNotification('Succes', 'success', 'The hospital has been updated'));
  }

  public deleteHospital = async(hospital: HospitalModel, index: number): Promise<void> => {
    const result = await this.alert.makeQustion(`You are deleting ${hospital.name} hospital`);
    if(result.value)
      this.hospitalService.deleteHospital(hospital.id)
                          .subscribe( result => {
                            this.hospitals.splice(index, 1);
                            this.alert.makeNotification('Success', 'success', 'Hospital deleted');
                          })
  }

  public newHospital = async(): Promise<any> => {
    const { value: hospitalName } = await Swal.fire<string>({
      title: 'Enter the hospital name',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    if(hospitalName)
      this.hospitalService.saveHospital({name: hospitalName})
                          .subscribe( res => {
                            this.hospitals.push(res);
                            this.alert.makeNotification('Success', 'success', 'The hospital has been saved');
                          })
  }

  public get getHospitals(): HospitalModel[]{
    return this.hospitals;
  }

  public get getLoading(): boolean{
    return this.loading;
  }
}
