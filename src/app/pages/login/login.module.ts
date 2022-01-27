import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { UsersService } from '../users/services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

const MATERIAL_MODULES = [MatPaginatorModule, MatFormFieldModule, MatButtonModule, MatInputModule];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [UsersService]
})
export class LoginModule { }
