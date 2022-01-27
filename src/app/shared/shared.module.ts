import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UtilsService } from './services/utils.service';
import { LoginService } from '../pages/login/services/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatSnackBarModule, MatButtonModule];

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    UtilsService,
    LoginService
  ]
})
export class SharedModule { }
