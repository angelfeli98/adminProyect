
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { catchError, tap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad{

    constructor(
        private userService: UserService,
        private router: Router
    ){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>{
        return this.userService.validateToken().pipe(
            catchError( selector =>  of(false)),
            tap(res => (!!!res)? this.router.navigateByUrl('/login'): true),
        );
    }

    canLoad(
        route: Route,
        segment: import('@angular/router').UrlSegment[]
    ): Observable<boolean>{
        return this.userService.validateToken().pipe(
            catchError( selector =>  of(false)),
            tap(res => (!!!res)? this.router.navigateByUrl('/login'): true),
        );
    }
}