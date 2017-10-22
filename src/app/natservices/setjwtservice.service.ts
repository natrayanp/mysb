import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class SetjwtService {

  public token: string;
  
    constructor(private http: Http) { }
  
    login(natkey) {
      
      return this.http.post('http://127.0.0.1:8000/natkeys', JSON.stringify({ natkey: natkey }))
      //this.setjwtserviceservice.login(this.name,this.password)
          .map(res => {return res.json();})                    
    
  }
  
  
  
  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
  }

}
