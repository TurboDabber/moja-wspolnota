import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { MapViewComponent } from './map-view/map-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const MaterialComponents = [
  MatFormFieldModule, 
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MapViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialComponents,
    LeafletModule
  ],
  exports: [
    MaterialComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
