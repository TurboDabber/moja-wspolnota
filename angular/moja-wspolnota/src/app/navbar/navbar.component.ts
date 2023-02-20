import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClientService } from '../services/http-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(
    private router: Router,
    private httpClientService: HttpClientService
    ) { }
  
  get isUserLogged$(): Observable<boolean> {
    return of(localStorage.getItem('user_id') != null);
  }

  onRegisterClick(): void {
    this.router.navigate(['/', 'register']);
  }

  onLoginClick(): void {
    this.router.navigate(['/', 'login']);
  }

  onLogoutClick(): void {
    this.httpClientService.logout();
    window.location.reload();
  }

}
