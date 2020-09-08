import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { HospitalModel } from '../../models/hospital.model';
import { DoctorModel } from '../../models/doctor.model';
import { CollectionService } from '../../service/collections.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styles: [
  ]
})
export class SearchAllComponent implements OnInit, OnDestroy {

  public data: {users: UserModel[], hospitals: HospitalModel[], doctors: DoctorModel[]};
  private sub: Subscription;

  constructor(
    private collection: CollectionService,
    private router: Router
  ){
    this.sub = this.collection.getResults.subscribe( res => this.data = res );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.data = null;
    this.sub.unsubscribe();
  }

  public navigate = (id: string, type: string): void => {
    this.router.navigateByUrl(`/dashboard/${type}/${id}`);
  }

}
