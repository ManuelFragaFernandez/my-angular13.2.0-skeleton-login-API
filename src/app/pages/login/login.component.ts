import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { USER_TOKEN } from 'src/app/shared/constants/userToken';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { loginForm } from './interfaces/formInputs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private readonly loginService: LoginService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  public onLogin() {
    const loginData: loginForm = this.getFormData();

    this.loginService.logIn(loginData.email, loginData.password).
      pipe(
        tap(loginResponse => {
          localStorage.setItem(USER_TOKEN, loginResponse.token);
          this.loginService.userToken$.next(loginResponse.token);
        })
      ).
      subscribe({
        error: (error) => {
          if (error.status === 400 && error.statusText === 'OK') {
            this.utilsService.openSnackBar('Usuario o contraseña incorrectos');
          } else {
            this.utilsService.openSnackBar(error.message);
          }
        },
        complete: () => {
          this.router.navigate(['/users']);
        }
      }
      );
  }

  private getFormData(): loginForm {
    return this.loginForm.value;
  }

  private initForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }
}
