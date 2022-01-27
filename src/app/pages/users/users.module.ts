import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersService } from './services/users.service';
import { MatPaginatorModule } from '@angular/material/paginator';

const MATERIAL_MODULES = [MatPaginatorModule];


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule,
    UsersRoutingModule
  ],
  exports: [
    UsersComponent
  ],
  providers: [UsersService]
})
export class UsersModule { }
