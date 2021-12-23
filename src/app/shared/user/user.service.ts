import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstant } from '..';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  //get the user with request
  getUser(): Observable<any> {
    return this.http.get(GlobalConstant.apiURL + `/user/find`)
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(GlobalConstant.apiURL + '/admin', { responseType: 'text' });
  }
}