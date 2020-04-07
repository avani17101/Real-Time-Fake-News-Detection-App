import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
   
    private baseUrl = 'http://127.0.0.1:8000';
   
    constructor(private http: HttpClient) { }
   
    verify_url(url :any): Observable<any> {
      return this.http.post(`${this.baseUrl}/url_verification/`,url)
    }
    add_details(data :any): Observable<any>{
      return this.http.post(`${this.baseUrl}/add_review/`,data)
    }
    user_signup(data :any): Observable<any>{
      console.log(data)
      return this.http.post(`${this.baseUrl}/user_signup/`,data)
    }
    user_login(data :any): Observable<any>{
      console.log("hello")
      return this.http.post(`${this.baseUrl}/user_login/`,data)
    }
    check_url(data :any): Observable<any>{
      return this.http.post(`${this.baseUrl}/check_url/`,data)
    }
    
  }