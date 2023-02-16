import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { OnInit } from '@angular/core';
import { AddReligiousCenterModel } from '../models/add-religious-center-model';
import { ReligiousCenterModel } from '../models/religious-center-model';

interface LoginResponse {
  auth_token: string;
  user_id: bigint;
  user_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService{
  
  constructor(private http: HttpClient) { }

  async Init()
  {
      console.log("init")
      //test//TO DELETE
      this.login("student:)","piwo")
      //post
      const user = {
        password: 'ciupapi',
        google_id: 'op@a111121s1d.ad.com1',
        email: '3uaaa21a@21ff.pl',
        name: 'ciupapi',
        is_admin: 1
      };
  
      this.createUser(user).subscribe(response => {
        console.log('User created successfully:', response);
      }, error => {
        console.error('Error creating user:', error);
      });
      //GET
      const id = 1;
      this.getUser(id).subscribe(response => {
        console.log('User retrieved successfully:', response);
      }, error => {
        console.error('Error retrieving user:', error);
      });
      //end test
      //GET
      this.getCenter(id).subscribe(response => {
        console.log('Center retrieved successfully:', response);
      }, error => {
        console.error('Error retrieving center:', error);
      });

      const center = {
        name: "Katolicki kościół piwa",
        lat: 30.92,
        lng: 90.4,
        user_id: 1, 
        desc: "super religion, recommend for all family",
        image: "1123- base64 obrazek jako string lub url do obrazka",
        religion_type_id: 0
    };
  
      this.postCenter(center).subscribe(response => {
        console.log('center created successfully:', response);
      }, error => {
        console.error('Error creating center:', error);
      });
  }

  loginTest() {
    return this.http.get('http://127.0.0.1:5000/login-test', { observe: 'response'}, ).subscribe(response => {
      if (response.status == 201) 
        return true;
      else //add log error smthg
        return false;
    })
  }

  login(_user_name: string, _password: string) {
    return this.http.post('http://127.0.0.1:5000/login',{user_name: _user_name, password: _password},{ observe: 'response'}).subscribe(response => {
      const loginResponse = response.body as LoginResponse;
      console.log(loginResponse)
      localStorage.setItem('auth_token', loginResponse.auth_token);
      console.log(loginResponse.auth_token)
      console.log("EEEE" + localStorage.getItem('auth_token'))
      localStorage.setItem('user_id', loginResponse.user_id.toString() );
      localStorage.setItem('user_name', loginResponse.user_name.toString() );
      console.log(response.headers);
      console.log(response.body);
    })
  }

  logout() {
    return this.http.get('http://127.0.0.1:5000/logout',{ observe: 'response'}).subscribe(response => {
      localStorage.clear();

      console.log(response.headers);
      console.log(response.body);
    })
  }


  createUser(user: any) {
    return this.http.post('http://127.0.0.1:5000/users', user,{});
  }

  getUser(id: number) {
    return this.http.get(`http://127.0.0.1:5000/users/${id}`,{});
  }

  postCenter(religiousCenter: AddReligiousCenterModel) {
    return this.http.post('http://127.0.0.1:5000/religious_centers', religiousCenter, { });
  }

  getCenter(id: number) {
    return this.http.get(`http://127.0.0.1:5000/religious_centers/${id}`,{  });
  }

  getAllCenters() {
    return this.http.get<ReligiousCenterModel[]>(`http://127.0.0.1:5000/religious_centers`,{  });
  }
}
