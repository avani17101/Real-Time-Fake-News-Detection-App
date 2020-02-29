import { Injectable } from '@angular/core';
import { Http ,Headers} from "@angular/http";

@Injectable()
export class DataserviceService {

 constructor(private http:Http) { }

// *******************************************************************************************************************************
//get social media Account Details (dashboard)
getSocialMediaData() { 
    return this.http.get("http://localhost:12952/api/Users/GetData")
      .map(res => res.json());
   }

// **************************************************************************************************************************
// Register API call by diksha
onRegister(resource){
  debugger;
    let url="http://localhost:12952/api/Account/Register";
     var headers = new Headers();
     headers.append('Content-Type', 'application/json'); 
     return this.http.post(url,JSON.stringify(resource),{headers:headers})
       .map(response=>response.json());  
  }



// *******************************************************************************************************************
//  Twitter API call by diksha
 makeTwittercall(){
   var headers = new Headers();
   headers.append('Content-Type', 'application/X-www-form-urlencoded');
       return this.http.get('http://localhost:12952/api/Twitter',{headers:headers})
       .map(res => res.json());
}

// **********************************************************************************************************************
//Instagram ApI Call diksha
makeInstagramcall(){
   var headers = new Headers();
   headers.append('Content-Type', 'application/X-www-form-urlencoded');
       return this.http.get('http://localhost:12952/api/Instagram',{headers:headers})
      .map(res => res.json());
}

}

