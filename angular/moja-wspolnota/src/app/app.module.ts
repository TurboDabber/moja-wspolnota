import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NgLetModule } from 'ng-let';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import { MapViewComponent } from './map-view/map-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MainViewComponent } from './main-view/main-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfoSideViewComponent } from './info-side-view/info-side-view.component';
import { MarkersService } from './services/markers.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddReligiousCenterModalComponent } from './modals/add-religious-center-modal/add-religious-center-modal.component';
import { AuthInterceptor } from './auth.interceptor';
import { ReligiousCenterInfoModalComponent } from './modals/religious-center-info-modal/religious-center-info-modal.component';
import { InfoDialogModal } from './modals/info-dialog-modal/info-dialog-modal.component';

const MaterialComponents = [
  MatFormFieldModule, 
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MapViewComponent,
    MainViewComponent,
    NavbarComponent,
    InfoSideViewComponent,
    AddReligiousCenterModalComponent,
    ReligiousCenterInfoModalComponent,
    InfoDialogModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialComponents,
    LeafletModule,
    HttpClientModule,
    NgLetModule
  ],
  exports: [
    MaterialComponents
  ],
  providers: [
    MarkersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents: [
    AddReligiousCenterModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
