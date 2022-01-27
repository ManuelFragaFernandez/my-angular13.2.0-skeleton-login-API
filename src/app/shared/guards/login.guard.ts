import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { USER_TOKEN } from 'src/app/shared/constants/userToken';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private readonly router: Router) { }
    canActivate(route: ActivatedRouteSnapshot) {
        if (route.routeConfig?.path !== 'login') {
            if (localStorage.getItem(USER_TOKEN)) {
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        }

        if (localStorage.getItem(USER_TOKEN)) {
            this.router.navigate(['/users']);
            return false;
        }
        return true;
    }
}

