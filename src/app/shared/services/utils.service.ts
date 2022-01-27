import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private readonly _snackBar: MatSnackBar) { }

  openSnackBar(error: string) {
    this._snackBar.open(error, 'Cerrar', {
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
