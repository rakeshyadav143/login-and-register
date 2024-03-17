import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../components/register/register.component';
//component we just created

@Injectable()

export class DialogService {

  constructor(private dialog: MatDialog) {}

  open(data: any) {
    return this.dialog.open(RegisterComponent), {
        height: '300px',
        width: '600px',
      };
  }
}