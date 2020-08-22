import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  private data: any;
  private routeSub$: Subscription;

  constructor(
    private router: Router
  ){
    this.routeSub$ = this.getRoute();
  }

  private getRoute = (): Subscription =>{
    return this.router.events.pipe(
      filter( (event: any) => (event instanceof ActivationEnd) && event.snapshot.data.title ),
      map( event => event.snapshot.data )
    ).subscribe(({title}) => {
      this.data = title;
      document.title = `Health - ${title}`;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.routeSub$.unsubscribe();
  }

  public get getData(): string{
    return this.data;
  }

}
