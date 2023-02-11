import { Component } from '@angular/core';

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

  onClick(): void {
    if (this.password != this.passwordRepeat) {
      
    }
  }
}
