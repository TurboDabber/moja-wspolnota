import { Component } from '@angular/core';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  email: string = '';
  password: string = '';

  onClick(): void {

  }
}
