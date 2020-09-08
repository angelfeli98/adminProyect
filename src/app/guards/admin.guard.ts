
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{

    private user: UserModel;

    constructor(
        private userService: UserService,
        private router: Router
    ){
        this.user = this.userService.user;
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean{
        this.user = this.userService.user;
        if(this.user.role === 'USER_ROLE')
            this.router.navigateByUrl('/dashboard');
        return (this.user.role === 'ADMIN_ROLE');
    }
}
