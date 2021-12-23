import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstant } from '..';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
    constructor(private http: HttpClient) { }

    searchUsers(input: string) {
      return this.http.get(GlobalConstant.apiURL + `/user/search?input=${input}`);
    }
}