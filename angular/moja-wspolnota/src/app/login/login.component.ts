import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoDialogModal } from '../modals/info-dialog-modal/info-dialog-modal.component';
import { HttpClientService } from '../services/http-client.service';
import { LoginResponse } from './login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  userName: string = '';
  password: string = '';

  constructor(
    private httpClientService:HttpClientService,
    private router: Router,
    public dialog: MatDialog
    ) {}

  onClick(): void {
    if(this.userName.length > 0 && this.password.length > 0) {
      this.httpClientService.login(this.userName, this.password).subscribe(response => {
        const loginResponse = response.body as LoginResponse;
        console.log(loginResponse)
        localStorage.setItem('auth_token', loginResponse.auth_token);
        console.log(loginResponse.auth_token)
        console.log("EEEE" + localStorage.getItem('auth_token'))
        localStorage.setItem('user_id', loginResponse.user_id.toString() );
        localStorage.setItem('user_name', loginResponse.user_name.toString() );
        console.log(response.headers);
        console.log(response.body);
        this.router.navigate(['/main']);
      },
      error => {
        this.dialog.open(InfoDialogModal, {data: 'Niepoprawny login lub hasło'});
      });
    }
  }
}
