import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogModal } from '../modals/info-dialog-modal/info-dialog-modal.component';
import { HttpClientService } from '../services/http-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(
    private httpClientService: HttpClientService,
    public dialog: MatDialog
  ) {}

  onClick(): void {
    if (this.password != this.passwordRepeat) {
      this.dialog.open(InfoDialogModal, {data: 'Hasła nie są identyczne.'});
    }
    else {
      this.httpClientService.createUser({name: this.name, email: this.email, password: this.password}).subscribe(response => {
        this.dialog.open(InfoDialogModal, {data: 'Zarejestrowano pomyślnie.'});
      }, error => {
        this.dialog.open(InfoDialogModal, {data: 'Podczas rejestracji wystąpił błąd.'});
      });
    }
  }
}
