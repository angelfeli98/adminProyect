import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, SubscriptionLike } from 'rxjs';
import { retry, take, map, filter, timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  private interval: SubscriptionLike;

  constructor(){

    this.makeInterval();
    // this.makeObservable().pipe( retry(1) ).subscribe(
    //   console.log,
    //   console.log,
    //   () => console.log('Fin'))

    this.interval = this.makeInterval().subscribe(console.log);

    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void{
      this.interval.unsubscribe();
    }

    /* Interval que regresa un observable
      Take returna un contado numero de cambios de un observable
    */
    private makeInterval = (): Observable<string> =>{
      return interval(500)
                  .pipe(
                    //take(10),
                    filter( data => (data%2) == 0 ),
                    map( data => `Hola mundo ${data}` )
                    )
    }

    private makeObservable = (): Observable<number | string> =>{
      return new Observable<number | string>( observer => {
        let i = 0;
        const interval = setInterval(() => {
          observer.next(i)
          i++;

          if(i == 4){
            observer.complete()
            interval
            clearInterval(interval);
          }
          if(i == 2){
            observer.error('Error')
          }
        }, 1000)

      });
    }

}
