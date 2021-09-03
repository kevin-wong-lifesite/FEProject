import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const FILE_API = 'http://localhost:6969/api/file/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient, tokenService: TokenStorageService) { }

  getFileCount(): Observable<any> {
    return this.http.get(FILE_API + `user/${TokenStorageService.userId}/count`)
  }

  fetchFiles(limit?,offset?): Observable<any> {
    let route = FILE_API + `user/${TokenStorageService.userId}`;
    if (limit || offset) {
      route = route + `?limit=${limit}&offset=${offset}`;
    }
    return this.http.get(route);
  }
}