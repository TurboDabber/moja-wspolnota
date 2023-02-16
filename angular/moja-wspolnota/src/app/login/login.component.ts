import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { HttpClientService } from '../services/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  email: string = '';
  password: string = '';
  constructor(private httpClientService:HttpClientService){}
  onClick(): void {
    this.httpClientService.login("ciupapi2","12345");
  }
}
