import { Injectable, Inject } from "@angular/core";
import { Http, Response,RequestOptions,Headers } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService{
  public token: string;
  public headers:Headers;


    constructor( @Inject(Http) public http:Http){
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(applicationUser:any){
        
        debugger;
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
   
          var data="grant_type=password&username=" + applicationUser.email + "&password=" + applicationUser.password;

         return this.http.post("http://localhost:12952/token", data,options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                debugger;
                let token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;
                    debugger;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: applicationUser.Email, token: token }));                 
                   
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
           
        
    }



logout(): void {
        debugger;
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }



}












//not neccessary
  // isLoggedIn(){
  //     return false;
  // }
