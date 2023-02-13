import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(private router: Router) {

  }

  onRegisterClick(): void {
    this.router.navigate(['/', 'register']);
  }

  onLoginClick(): void {
    this.router.navigate(['/', 'login']);
  }

}
