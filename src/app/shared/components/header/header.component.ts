import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { USER_TOKEN } from '../../constants/userToken';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input('title') title!: string;

    user$ = this.loginService.user$;

    constructor(
        private readonly loginService: LoginService
    ) { }

    ngOnInit(): void {
        //TODO -> Necesario en páginas web debido que al escribir una ruta en el navegador la aplicación se recarga
        if (localStorage.getItem(USER_TOKEN)) {
            this.loginService.userToken$.next(localStorage.getItem(USER_TOKEN));
        }
    }

    logOut(): void {
        this.loginService.logOut();
    }

}
